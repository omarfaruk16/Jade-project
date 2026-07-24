const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const auth = require('../middleware/auth');

// GET all blogs (Public)
router.get('/', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET recent blogs — limit clamped to max 20 to prevent full-table dumps (Public)
router.get('/recent', async (req, res) => {
  try {
    const rawLimit = parseInt(req.query.limit);
    const limit = isNaN(rawLimit) ? 4 : Math.min(Math.max(rawLimit, 1), 20);
    const blogs = await prisma.blog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET blog by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug }
    });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a blog (Protected — auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, coverImage, description } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Generate slug from title
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Ensure slug uniqueness
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug,
        coverImage: coverImage || null,
        description: description || ''
      }
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog (Protected — auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, coverImage, description } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (description !== undefined) updateData.description = description;

    if (title) {
      let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = await prisma.blog.findUnique({ where: { slug } });
      if (existing && existing.id !== id) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: updateData
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog (Protected — auth required)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.blog.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
