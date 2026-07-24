const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const auth = require('../middleware/auth');

// GET contact info (Public)
router.get('/', async (req, res) => {
  try {
    let contact = await prisma.contactSettings.findUnique({
      where: { id: 'default' },
      include: {
        socials: true,
        addresses: { orderBy: { order: 'asc' } }
      }
    });

    if (!contact) {
      contact = await prisma.contactSettings.create({
        data: {
          id: 'default',
          phone: '',
          email: '',
          address: '',
          socials: { create: [] }
        },
        include: { socials: true, addresses: true }
      });
    }

    // If no proper addresses in the Address table yet, fall back to the legacy
    // JSON/text stored in the `address` column so existing data still shows.
    let addresses = contact.addresses;
    if (!addresses || addresses.length === 0) {
      try {
        if (contact.address && contact.address.startsWith('[')) {
          addresses = JSON.parse(contact.address);
        } else if (contact.address) {
          addresses = [{ label: 'Headquarters', address: contact.address }];
        }
      } catch {
        addresses = contact.address
          ? [{ label: 'Headquarters', address: contact.address }]
          : [];
      }
    }

    res.json({ ...contact, addresses });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE basic contact info + socials + site title (Protected)
router.put('/', auth, async (req, res) => {
  const { phone, email, socials, siteTitle, siteDescription } = req.body;

  if (typeof phone !== 'string' || phone.length > 50) {
    return res.status(400).json({ error: 'Phone must be a string up to 50 characters.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 100) {
    return res.status(400).json({ error: 'A valid email is required (up to 100 characters).' });
  }
  if (!Array.isArray(socials)) {
    return res.status(400).json({ error: 'Socials must be an array.' });
  }
  for (const s of socials) {
    if (!s || typeof s.name !== 'string' || typeof s.url !== 'string') {
      return res.status(400).json({ error: 'Each social must have a valid string name and url.' });
    }
  }
  if (siteTitle !== undefined && (typeof siteTitle !== 'string' || siteTitle.length > 200)) {
    return res.status(400).json({ error: 'Site title must be a string up to 200 characters.' });
  }
  if (siteDescription !== undefined && (typeof siteDescription !== 'string' || siteDescription.length > 500)) {
    return res.status(400).json({ error: 'Site description must be a string up to 500 characters.' });
  }

  try {
    const updateData = {
      phone,
      email,
      socials: {
        deleteMany: {},
        create: socials.map(s => ({ name: s.name, url: s.url }))
      }
    };
    if (siteTitle !== undefined) updateData.siteTitle = siteTitle;
    if (siteDescription !== undefined) updateData.siteDescription = siteDescription;

    const contact = await prisma.contactSettings.upsert({
      where: { id: 'default' },
      update: updateData,
      create: {
        id: 'default',
        phone,
        email,
        address: '',
        siteTitle: siteTitle || 'Jade Kitchen Design | Interior Products Manufacturer Malaysia',
        siteDescription: siteDescription || '',
        socials: { create: socials.map(s => ({ name: s.name, url: s.url })) }
      },
      include: { socials: true, addresses: { orderBy: { order: 'asc' } } }
    });

    res.json(contact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Address CRUD (Protected) ─────────────────────────────────────────────────

// POST — add a new address
router.post('/addresses', auth, async (req, res) => {
  const { label, address, order } = req.body;
  if (typeof address !== 'string' || !address.trim() || address.length > 500) {
    return res.status(400).json({ error: 'Address is required (up to 500 characters).' });
  }
  if (label !== undefined && (typeof label !== 'string' || label.length > 100)) {
    return res.status(400).json({ error: 'Label must be a string up to 100 characters.' });
  }

  // Ensure contact settings record exists
  await prisma.contactSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', phone: '', email: 'hello@example.com', address: '' }
  });

  try {
    const newAddress = await prisma.address.create({
      data: {
        label: label ? label.trim() : null,
        address: address.trim(),
        order: typeof order === 'number' ? order : 0,
        contactSettingsId: 'default'
      }
    });
    res.status(201).json(newAddress);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT — update an address
router.put('/addresses/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { label, address, order } = req.body;
  if (address !== undefined && (typeof address !== 'string' || address.length > 500)) {
    return res.status(400).json({ error: 'Address must be a string up to 500 characters.' });
  }
  if (label !== undefined && label !== null && (typeof label !== 'string' || label.length > 100)) {
    return res.status(400).json({ error: 'Label must be a string up to 100 characters.' });
  }

  try {
    const updated = await prisma.address.update({
      where: { id },
      data: {
        ...(address !== undefined && { address: address.trim() }),
        ...(label !== undefined && { label: label ? label.trim() : null }),
        ...(typeof order === 'number' && { order })
      }
    });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE — remove an address
router.delete('/addresses/:id', auth, async (req, res) => {
  try {
    await prisma.address.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Contact Messages ─────────────────────────────────────────────────────────

router.post('/messages', async (req, res) => {
  const { fullName, email, message } = req.body;
  if (typeof fullName !== 'string' || !fullName.trim() || fullName.length > 100) {
    return res.status(400).json({ error: 'Full name must be a string between 1 and 100 characters.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 100) {
    return res.status(400).json({ error: 'A valid email is required (up to 100 characters).' });
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return res.status(400).json({ error: 'Message must be a string between 1 and 2000 characters.' });
  }

  try {
    const newMsg = await prisma.contactMessage.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        message: message.trim()
      }
    });
    res.status(201).json(newMsg);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/messages/:id', auth, async (req, res) => {
  try {
    await prisma.contactMessage.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
