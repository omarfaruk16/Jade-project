/**
 * Run on production server:
 *   docker exec jade_backend node fix_blog_images.js
 *
 * Assigns proper Unsplash cover images to every blog post based on title,
 * and deletes any stray test posts (e.g. "5 concept videos").
 */

const prisma = require('./prisma');

// Map partial title → Unsplash cover image
const IMAGE_MAP = [
  {
    match: /design.*installation|installation.*support/i,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400',
  },
  {
    match: /art of understanding|clarity in every/i,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400',
  },
  {
    match: /craft of perfection|flawless lasting/i,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1400',
  },
  {
    match: /promise of forever|trust that never/i,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400',
  },
  {
    match: /minimalist living|peace and purpose/i,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400',
  },
  {
    match: /spatial flow|intuitive transition/i,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400',
  },
  {
    match: /material harmony|wood.*metal.*stone/i,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1400',
  },
  {
    match: /lighting as an experience|sculpting with illumination/i,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400',
  },
];

// Titles that should be deleted (test/junk posts)
const DELETE_PATTERNS = [
  /5 concept videos/i,
  /test/i,
  /untitled/i,
  /draft/i,
];

async function main() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'asc' } });
  console.log(`Found ${blogs.length} blog post(s).\n`);

  for (const blog of blogs) {
    // Check if it should be deleted
    const shouldDelete = DELETE_PATTERNS.some(p => p.test(blog.title));
    if (shouldDelete) {
      await prisma.blog.delete({ where: { id: blog.id } });
      console.log(`🗑  Deleted:  "${blog.title}"`);
      continue;
    }

    // Find matching image
    const entry = IMAGE_MAP.find(e => e.match.test(blog.title));
    if (entry) {
      await prisma.blog.update({
        where: { id: blog.id },
        data: { coverImage: entry.image },
      });
      console.log(`✅ Updated:  "${blog.title}"`);
    } else {
      // Fallback: assign a generic interior design image
      const fallback = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400';
      await prisma.blog.update({
        where: { id: blog.id },
        data: { coverImage: fallback },
      });
      console.log(`🔄 Fallback: "${blog.title}"`);
    }
  }

  console.log('\nDone.');
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
