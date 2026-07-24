const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper: slugify
const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ─── PUBLIC: full tree ────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const parents = await prisma.serviceParentCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        children: {
          orderBy: { order: 'asc' },
          include: {
            items: {
              orderBy: { order: 'asc' },
              include: { whatsIncluded: { orderBy: { order: 'asc' } }, gallery: { orderBy: { order: 'asc' } } }
            }
          }
        }
      }
    });
    res.json(parents);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── PUBLIC: single child category by slug ───────────────────────────────────
router.get('/child/:slug', async (req, res) => {
  try {
    const child = await prisma.serviceChildCategory.findUnique({
      where: { slug: req.params.slug },
      include: {
        parent: true,
        items: {
          orderBy: { order: 'asc' },
          include: { whatsIncluded: { orderBy: { order: 'asc' } }, gallery: { orderBy: { order: 'asc' } } }
        }
      }
    });
    if (!child) return res.status(404).json({ error: 'Not found' });
    res.json(child);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ════════════════════════════════════════════════════════
//  PARENT CATEGORIES
// ════════════════════════════════════════════════════════

router.get('/parents', async (req, res) => {
  try {
    const parents = await prisma.serviceParentCategory.findMany({ orderBy: { order: 'asc' } });
    res.json(parents);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/parents', auth, async (req, res) => {
  try {
    const { name, order } = req.body;
    const item = await prisma.serviceParentCategory.create({ data: { name, order: Number(order) || 0 } });
    res.json(item);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/parents/:id', auth, async (req, res) => {
  try {
    const { name, order } = req.body;
    const item = await prisma.serviceParentCategory.update({ where: { id: req.params.id }, data: { name, order: Number(order) || 0 } });
    res.json(item);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/parents/:id', auth, async (req, res) => {
  try {
    await prisma.serviceParentCategory.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// ════════════════════════════════════════════════════════
//  CHILD CATEGORIES
// ════════════════════════════════════════════════════════

router.get('/children', async (req, res) => {
  try {
    const children = await prisma.serviceChildCategory.findMany({
      orderBy: { order: 'asc' },
      include: { parent: true }
    });
    res.json(children);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/children', auth, async (req, res) => {
  try {
    const { name, parentId, description, coverImage, subtitle, statsNumber, statsText, order } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const item = await prisma.serviceChildCategory.create({
      data: { name, slug, parentId, description, coverImage, subtitle, statsNumber, statsText, order: Number(order) || 0 }
    });
    res.json(item);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/children/reorder', auth, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids must be an array' });
    
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.serviceChildCategory.update({
          where: { id },
          data: { order: index }
        })
      )
    );
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/children/:id', auth, async (req, res) => {
  try {
    const { name, parentId, description, coverImage, subtitle, statsNumber, statsText, order } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const item = await prisma.serviceChildCategory.update({
      where: { id: req.params.id },
      data: { name, slug, parentId, description, coverImage, subtitle, statsNumber, statsText, order: Number(order) || 0 }
    });
    res.json(item);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/children/:id', auth, async (req, res) => {
  try {
    await prisma.serviceChildCategory.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// ════════════════════════════════════════════════════════
//  SERVICE ITEMS
// ════════════════════════════════════════════════════════

router.get('/items', async (req, res) => {
  try {
    const items = await prisma.serviceItem.findMany({
      orderBy: { order: 'asc' },
      include: {
        childCategory: { include: { parent: true } },
        whatsIncluded: { orderBy: { order: 'asc' } },
        gallery: { orderBy: { order: 'asc' } }
      }
    });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/items/:id', async (req, res) => {
  try {
    const item = await prisma.serviceItem.findUnique({
      where: { id: req.params.id },
      include: {
        childCategory: { include: { parent: true } },
        whatsIncluded: { orderBy: { order: 'asc' } },
        gallery: { orderBy: { order: 'asc' } }
      }
    });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/items', auth, async (req, res) => {
  try {
    const { title, about, keyLine, imageUrl, childCategoryId, order, whatsIncluded, gallery, overviewCategory, overviewBestFor, overviewStyleApproach, featureQuotesJson } = req.body;
    const item = await prisma.serviceItem.create({
      data: {
        title, about, keyLine, imageUrl, childCategoryId, order: Number(order) || 0,
        overviewCategory, overviewBestFor, overviewStyleApproach,
        featureQuotesJson: featureQuotesJson || "[]",
        whatsIncluded: {
          create: (whatsIncluded || []).map((w, i) => ({ title: w.title, description: w.description, order: i }))
        },
        gallery: {
          create: (gallery || []).map((g, i) => ({ url: g.url, order: i }))
        }
      },
      include: { whatsIncluded: true, gallery: true }
    });
    res.json(item);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/items/:id', auth, async (req, res) => {
  try {
    const { title, about, keyLine, imageUrl, childCategoryId, order, whatsIncluded, gallery, overviewCategory, overviewBestFor, overviewStyleApproach, featureQuotesJson } = req.body;
    // Delete children then recreate (simplest pattern for SQLite)
    await prisma.whatsIncludedItem.deleteMany({ where: { serviceItemId: req.params.id } });
    await prisma.serviceGalleryImage.deleteMany({ where: { serviceItemId: req.params.id } });
    const item = await prisma.serviceItem.update({
      where: { id: req.params.id },
      data: {
        title, about, keyLine, imageUrl, childCategoryId, order: Number(order) || 0,
        overviewCategory, overviewBestFor, overviewStyleApproach,
        featureQuotesJson: featureQuotesJson || "[]",
        whatsIncluded: {
          create: (whatsIncluded || []).map((w, i) => ({ title: w.title, description: w.description, order: i }))
        },
        gallery: {
          create: (gallery || []).map((g, i) => ({ url: g.url, order: i }))
        }
      },
      include: { whatsIncluded: true, gallery: true }
    });
    res.json(item);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// DELETE service item (Protected)
router.delete('/items/:id', auth, async (req, res) => {
  try {
    await prisma.serviceItem.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
