const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all FAQs (Public)
router.get('/', async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(faqs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new FAQ (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and Answer are required' });
    }
    const faq = await prisma.fAQ.create({
      data: { question, answer }
    });
    res.json(faq);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update FAQ (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { question, answer } = req.body;
    const data = {};
    if (question !== undefined) data.question = question;
    if (answer !== undefined) data.answer = answer;

    const faq = await prisma.fAQ.update({
      where: { id: req.params.id },
      data
    });
    res.json(faq);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE FAQ (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.fAQ.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
