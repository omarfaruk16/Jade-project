const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper: ensure whitelisted fields and JSON string fields are properly stored
const sanitizeProject = (body) => {
  const allowedFields = [
    'title', 'subtitle', 'coverImage', 'date', 'category', 'spacePlan', 'timeline',
    'overviewDesc', 'overviewImage', 'galleryJson', 'processImage', 'processStepsJson',
    'client', 'p1Title', 'p1Desc', 'p2Title', 'p2Desc', 'p3Title', 'p3Desc'
  ];
  
  const data = {};
  allowedFields.forEach(field => {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }
  });

  if (Array.isArray(data.galleryJson)) {
    data.galleryJson = JSON.stringify(data.galleryJson);
  }
  if (Array.isArray(data.processStepsJson)) {
    data.processStepsJson = JSON.stringify(data.processStepsJson);
  }
  return data;
};

// GET all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET specific project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id }
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new project (protected)
router.post('/', auth, async (req, res) => {
  try {
    const data = sanitizeProject(req.body);
    // basic check
    if (!data.title || !data.coverImage) {
      return res.status(400).json({ error: 'Title and Cover Image are required' });
    }
    const project = await prisma.project.create({ data });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update project (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const data = sanitizeProject(req.body);
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data
    });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE project (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
