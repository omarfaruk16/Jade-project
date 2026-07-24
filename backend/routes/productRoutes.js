const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// ─── PRODUCT CATEGORIES ──────────────────────────────────────────────────────

router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        products: {
          orderBy: { order: 'asc' },
          include: {
            whatsIncluded: { orderBy: { order: 'asc' } },
            gallery: { orderBy: { order: 'asc' } },
            descriptions: { orderBy: { order: 'asc' } },
            types: { orderBy: { order: 'asc' } },
            materials: { orderBy: { order: 'asc' }, include: { items: { orderBy: { order: 'asc' } } } },
            accessories: { orderBy: { order: 'asc' } },
            appliances: { orderBy: { order: 'asc' }, include: { items: { orderBy: { order: 'asc' } } } },
          }
        }
      }
    });
    res.json(categories);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/categories/:slug', async (req, res) => {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { slug: req.params.slug },
      include: {
        products: {
          orderBy: { order: 'asc' },
          include: {
            whatsIncluded: { orderBy: { order: 'asc' } },
            gallery: { orderBy: { order: 'asc' } },
            descriptions: { orderBy: { order: 'asc' } },
            types: { orderBy: { order: 'asc' } },
            materials: { orderBy: { order: 'asc' }, include: { items: { orderBy: { order: 'asc' } } } },
            accessories: { orderBy: { order: 'asc' } },
            appliances: { orderBy: { order: 'asc' }, include: { items: { orderBy: { order: 'asc' } } } },
          }
        }
      }
    });
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/categories', auth, async (req, res) => {
  try {
    const { name, image, subtitle, order } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = await prisma.productCategory.create({
      data: { name, slug, image, subtitle: subtitle || null, order: Number(order) || 0 }
    });
    res.json(category);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/categories/:id', auth, async (req, res) => {
  try {
    const { name, image, subtitle, order } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = await prisma.productCategory.update({
      where: { id: req.params.id },
      data: { name, slug, image, subtitle: subtitle || null, order: Number(order) || 0 }
    });
    res.json(category);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/categories/:id', auth, async (req, res) => {
  try {
    await prisma.productCategory.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

const fullProductInclude = {
  category: true,
  whatsIncluded: { orderBy: { order: 'asc' } },
  gallery: { orderBy: { order: 'asc' } },
  descriptions: { orderBy: { order: 'asc' } },
  types: { orderBy: { order: 'asc' } },
  materials: { orderBy: { order: 'asc' }, include: { items: { orderBy: { order: 'asc' } } } },
  accessories: { orderBy: { order: 'asc' }, include: { items: { orderBy: { order: 'asc' } } } },
  appliances: { orderBy: { order: 'asc' }, include: { items: { orderBy: { order: 'asc' } } } },
};

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { order: 'asc' },
      include: fullProductInclude
    });
    res.json(products);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: fullProductInclude
    });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const {
      title, subtitle, coverImage, overviewCategory, overviewBestFor, overviewStyleApproach,
      about, keyLine, imageUrl, categoryId, order, whatsIncluded, gallery, featureQuotesJson,
      descriptions, types, materials, accessories, appliances
    } = req.body;

    const product = await prisma.product.create({
      data: {
        title, subtitle, coverImage,
        overviewCategory, overviewBestFor, overviewStyleApproach,
        about, keyLine, imageUrl,
        featureQuotesJson: featureQuotesJson || '[]',
        categoryId, order: Number(order) || 0,
        whatsIncluded: { create: (whatsIncluded || []).map((w, i) => ({ title: w.title, description: w.description, order: i })) },
        gallery: { create: (gallery || []).map((g, i) => ({ url: g.url, order: i })) },
        descriptions: { create: (descriptions || []).map((d, i) => ({ title: d.title, description: d.description, order: i })) },
        types: { create: (types || []).map((t, i) => ({ name: t.name, image: t.image, order: i })) },
        materials: {
          create: (materials || []).map((m, i) => ({
            sectionTitle: m.sectionTitle,
            sectionDesc: m.sectionDesc,
            order: i,
            items: { create: (m.items || []).map((item, j) => ({ title: item.title, description: item.description, image: item.image, order: j })) }
          }))
        },
        accessories: {
          create: (accessories || []).map((a, i) => ({
            sectionTitle: a.sectionTitle,
            sectionDesc: a.sectionDesc,
            order: i,
            items: { create: (a.items || []).map((item, j) => ({ title: item.title, description: item.description, image: item.image, order: j })) }
          }))
        },
        appliances: {
          create: (appliances || []).map((a, i) => ({
            sectionTitle: a.sectionTitle,
            sectionDesc: a.sectionDesc,
            order: i,
            items: { create: (a.items || []).map((item, j) => ({ title: item.title, description: item.description, image: item.image, order: j })) }
          }))
        },
      },
      include: fullProductInclude
    });
    res.json(product);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title, subtitle, coverImage, overviewCategory, overviewBestFor, overviewStyleApproach,
      about, keyLine, imageUrl, categoryId, order, whatsIncluded, gallery, featureQuotesJson,
      descriptions, types, materials, accessories, appliances
    } = req.body;

    // Delete all existing sub-records
    await prisma.productWhatsIncluded.deleteMany({ where: { productId: req.params.id } });
    await prisma.productGalleryImage.deleteMany({ where: { productId: req.params.id } });
    await prisma.productDescription.deleteMany({ where: { productId: req.params.id } });
    await prisma.productType.deleteMany({ where: { productId: req.params.id } });

    // For materials, accessories, and appliances, delete items first then parent
    const existingMaterials = await prisma.productMaterial.findMany({ where: { productId: req.params.id } });
    for (const m of existingMaterials) {
      await prisma.productMaterialItem.deleteMany({ where: { materialId: m.id } });
    }
    await prisma.productMaterial.deleteMany({ where: { productId: req.params.id } });

    const existingAccessories = await prisma.productAccessory.findMany({ where: { productId: req.params.id } });
    for (const a of existingAccessories) {
      await prisma.productAccessoryItem.deleteMany({ where: { accessoryId: a.id } });
    }
    await prisma.productAccessory.deleteMany({ where: { productId: req.params.id } });

    const existingAppliances = await prisma.productAppliance.findMany({ where: { productId: req.params.id } });
    for (const a of existingAppliances) {
      await prisma.productApplianceItem.deleteMany({ where: { applianceId: a.id } });
    }
    await prisma.productAppliance.deleteMany({ where: { productId: req.params.id } });

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        title, subtitle, coverImage,
        overviewCategory, overviewBestFor, overviewStyleApproach,
        about, keyLine, imageUrl,
        featureQuotesJson: featureQuotesJson || '[]',
        categoryId, order: Number(order) || 0,
        whatsIncluded: { create: (whatsIncluded || []).map((w, i) => ({ title: w.title, description: w.description, order: i })) },
        gallery: { create: (gallery || []).map((g, i) => ({ url: g.url, order: i })) },
        descriptions: { create: (descriptions || []).map((d, i) => ({ title: d.title, description: d.description, order: i })) },
        types: { create: (types || []).map((t, i) => ({ name: t.name, image: t.image, order: i })) },
        materials: {
          create: (materials || []).map((m, i) => ({
            sectionTitle: m.sectionTitle,
            sectionDesc: m.sectionDesc,
            order: i,
            items: { create: (m.items || []).map((item, j) => ({ title: item.title, description: item.description, image: item.image, order: j })) }
          }))
        },
        accessories: {
          create: (accessories || []).map((a, i) => ({
            sectionTitle: a.sectionTitle,
            sectionDesc: a.sectionDesc,
            order: i,
            items: { create: (a.items || []).map((item, j) => ({ title: item.title, description: item.description, image: item.image, order: j })) }
          }))
        },
        appliances: {
          create: (appliances || []).map((a, i) => ({
            sectionTitle: a.sectionTitle,
            sectionDesc: a.sectionDesc,
            order: i,
            items: { create: (a.items || []).map((item, j) => ({ title: item.title, description: item.description, image: item.image, order: j })) }
          }))
        },
      },
      include: fullProductInclude
    });
    res.json(product);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
