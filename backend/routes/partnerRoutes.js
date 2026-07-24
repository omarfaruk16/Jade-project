const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const auth = require('../middleware/auth');

// GET all partners (Public) — optional ?page= filter
router.get('/', async (req, res) => {
  try {
    const { page } = req.query;
    const where = page ? { page } : {};
    const partners = await prisma.partner.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(partners);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CREATE partner (Protected)
router.post('/', auth, async (req, res) => {
  const { name, logo, page } = req.body;
  if (!name || !logo) {
    return res.status(400).json({ error: 'Name and Logo are required' });
  }
  try {
    const partner = await prisma.partner.create({
      data: { name, logo, page: page || 'about' }
    });
    res.json(partner);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE partner (Protected)
router.put('/:id', auth, async (req, res) => {
  const { name, logo, page } = req.body;
  try {
    const partner = await prisma.partner.update({
      where: { id: req.params.id },
      data: { name, logo, page: page || 'about' }
    });
    res.json(partner);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE partner (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.partner.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
