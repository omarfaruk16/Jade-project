const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({});

async function main() {
  // Setup Admin
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Admin account (admin/password123) assured.');

  // Create Coastal Retreat Project Example if no projects exist
  const count = await prisma.project.count();
  if (count === 0) {
    await prisma.project.create({
      data: {
        title: 'Coastal Retreat',
        subtitle: 'Designed to merge with natural views, 2025',
        coverImage: '/images/f1.png',
        date: 'Jun 13, 2025',
        category: 'Interior',
        client: 'Private',
        timeline: '8 Months',
        overviewDesc: 'A platform to enrich intuitive placement while achieving flow, balance, and harmony. This project aims to bring natural light deeply into the living area with panoramic windows and subtle warm textures throughout.',
        overviewImage: '/images/f3.png',
        galleryJson: JSON.stringify([
          '/images/f1.png',
          '/images/f2.png',
          '/images/f3.png'
        ]),
        processImage: '/images/f2.png',
        p1Title: '1. Concept Development',
        p1Desc: 'We worked closely with the clients to map out spatial requirements while anchoring the aesthetic in mid-century modern ethics blended with organic textures.',
        p2Title: '2. Spatial Planning',
        p2Desc: 'An open floor plan with robust circulation loops to ensure clear lines of sight from kitchen to living areas. Accented by seamlessly hidden storage.',
        p3Title: '3. Final Touches',
        p3Desc: 'The selection of custom furniture pieces alongside curated minimal artwork sets a timeless tone. Hand-polished surfaces round off the luxury atmosphere.'
      }
    });
    console.log('Dummy project "Coastal Retreat" seeded.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
