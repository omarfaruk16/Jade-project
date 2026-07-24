const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all team members (Public)
router.get('/', async (req, res) => {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(teamMembers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new team member (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const { name, designation, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({ error: 'Name and Image are required' });
    }
    const teamMember = await prisma.teamMember.create({
      data: { name, designation, image }
    });
    res.json(teamMember);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update team member (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, designation, image } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (designation !== undefined) data.designation = designation;
    if (image !== undefined) data.image = image;

    const teamMember = await prisma.teamMember.update({
      where: { id: req.params.id },
      data
    });
    res.json(teamMember);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE team member (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.teamMember.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
