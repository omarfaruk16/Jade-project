const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const auth = require('../middleware/auth');

// GET all partners (Public)
router.get('/', async (req, res) => {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(partners);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CREATE partner (Protected)
router.post('/', auth, async (req, res) => {
  const { name, logo } = req.body;
  if (!name || !logo) {
    return res.status(400).json({ error: 'Name and Logo are required' });
  }
  try {
    const partner = await prisma.partner.create({
      data: { name, logo }
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
