const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const auth = require('../middleware/auth');

// GET all dealer requests (Protected)
router.get('/requests', auth, async (req, res) => {
  try {
    const requests = await prisma.dealerRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SUBMIT dealer request (Public)
router.post('/submit', async (req, res) => {
  const { fullName, email, phone, businessName, location, budget, interest, message } = req.body;

  // Validation
  if (typeof fullName !== 'string' || !fullName.trim() || fullName.length > 100) {
    return res.status(400).json({ error: 'Full name is required (up to 100 characters).' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 100) {
    return res.status(400).json({ error: 'A valid email is required (up to 100 characters).' });
  }
  if (typeof phone !== 'string' || !phone.trim() || phone.length > 50) {
    return res.status(400).json({ error: 'Phone is required (up to 50 characters).' });
  }
  if (typeof businessName !== 'string' || !businessName.trim() || businessName.length > 150) {
    return res.status(400).json({ error: 'Business name is required (up to 150 characters).' });
  }
  if (typeof location !== 'string' || !location.trim() || location.length > 150) {
    return res.status(400).json({ error: 'Location is required (up to 150 characters).' });
  }
  if (typeof budget !== 'string' || !budget.trim() || budget.length > 50) {
    return res.status(400).json({ error: 'Budget is required (up to 50 characters).' });
  }
  if (typeof interest !== 'string' || !interest.trim() || interest.length > 100) {
    return res.status(400).json({ error: 'Interest is required (up to 100 characters).' });
  }
  if (message !== undefined && message !== null && (typeof message !== 'string' || message.length > 2000)) {
    return res.status(400).json({ error: 'Message must be a string up to 2000 characters.' });
  }

  try {
    const request = await prisma.dealerRequest.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        businessName: businessName.trim(),
        location: location.trim(),
        budget: budget.trim(),
        interest: interest.trim(),
        message: message ? message.trim() : null
      }
    });
    res.json(request);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE dealer request (Protected)
router.delete('/requests/:id', auth, async (req, res) => {
  try {
    await prisma.dealerRequest.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
