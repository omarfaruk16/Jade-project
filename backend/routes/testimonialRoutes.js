const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all testimonials (Public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(testimonials);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new testimonial (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const { name, role, review, avatar, rating } = req.body;
    if (!name || !review) {
      return res.status(400).json({ error: 'Name and Review are required' });
    }
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        review,
        avatar,
        rating: rating !== undefined ? parseInt(rating, 10) : undefined
      }
    });
    res.json(testimonial);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update testimonial (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, role, review, avatar, rating } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (role !== undefined) data.role = role;
    if (review !== undefined) data.review = review;
    if (avatar !== undefined) data.avatar = avatar;
    if (rating !== undefined) data.rating = parseInt(rating, 10);

    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data
    });
    res.json(testimonial);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE testimonial (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
