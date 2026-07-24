const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all promotions (Public)
router.get('/', async (req, res) => {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(promotions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new promotion (Protected — whitelisted fields only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, image } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const promotion = await prisma.promotion.create({
      data: { title: title.trim(), image: image || null }
    });
    res.json(promotion);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update promotion (Protected — whitelisted fields only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, image } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (image !== undefined) updateData.image = image;

    const promotion = await prisma.promotion.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(promotion);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE promotion (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.promotion.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;