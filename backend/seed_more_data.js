const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old services and products...');
  await prisma.serviceParentCategory.deleteMany({});
  await prisma.productCategory.deleteMany({});
  await prisma.blog.deleteMany({});

  console.log('Seeding service categories...');

  // Parent Category 1: Field of Expertise
  const parent1 = await prisma.serviceParentCategory.create({
    data: {
      name: 'Field of Expertise',
      order: 0,
      children: {
        create: [
          {
            name: 'Residential Interior Design',
            slug: 'residential-interior-design',
            description: 'Bespoke living spaces tailored to your lifestyle, blending aesthetic elegance with functionality.',
            subtitle: 'Bespoke home environments',
            statsNumber: '120+',
            statsText: 'Completed Homes',
            order: 0,
            items: {
              create: [
                {
                  title: 'Luxury Home Interiors',
                  about: 'Designing beautiful, custom living rooms, kitchens, and bedrooms that elevate your everyday life.',
                  keyLine: 'We shape spaces that reflect your personality.',
                  imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000'
                }
              ]
            }
          },
          {
            name: 'Commercial Interior Design',
            slug: 'commercial-interior-design',
            description: 'From boutique stores to modern offices, we design spaces that communicate your brand while enhancing flow and functionality.',
            subtitle: 'Elegant, liveable spaces',
            statsNumber: '50+',
            statsText: 'Corporate Spaces',
            order: 1,
            items: {
              create: [
                {
                  title: 'Retail Store & Showroom Design',
                  about: 'A retail store and showroom design is more than just a commercial space it’s a stage for customer engagement and brand storytelling.',
                  keyLine: 'Retail spaces redefine shopping offering brand visibility.',
                  imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000'
                }
              ]
            }
          },
          {
            name: 'Custom Furniture & OEM Solutions',
            slug: 'custom-furniture-oem-solutions',
            description: 'Custom millwork and built-in furniture crafted to fit your space perfectly.',
            subtitle: 'Tailored fit furniture',
            statsNumber: '500+',
            statsText: 'Custom Pieces',
            order: 2,
            items: {
              create: [
                {
                  title: 'Bespoke Furniture Crafting',
                  about: 'Custom cabinets, wardrobes, and tables built with premium materials and absolute precision.',
                  keyLine: 'Furniture designed to last a lifetime.',
                  imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000'
                }
              ]
            }
          }
        ]
      }
    }
  });

  // Parent Category 2: Tailored Solutions
  const parent2 = await prisma.serviceParentCategory.create({
    data: {
      name: 'Tailored Solutions',
      order: 1,
      children: {
        create: [
          {
            name: 'Design Curation & Consultancy',
            slug: 'design-curation-consultancy',
            description: 'Professional guidance on color palettes, materials, spatial planning, and interior styling.',
            subtitle: 'Expert design guidance',
            order: 0,
            items: {
              create: [
                {
                  title: 'Consultancy Service',
                  about: 'One-on-one session with our master designers to outline and refine your style vision.',
                  keyLine: 'Building your dream starts with a solid blueprint.',
                  imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000'
                }
              ]
            }
          },
          {
            name: 'Concept Visuals',
            slug: 'concept-visuals',
            description: 'Photorealistic 3D renders and mood boards that bring your potential space to life before building.',
            subtitle: 'Realistic 3D visualizations',
            order: 1,
            items: {
              create: [
                {
                  title: '3D Renderings & Walkthroughs',
                  about: 'See every detail of your future home with stunning 3D images and virtual reality models.',
                  keyLine: 'Pre-visualize every detail before any construction starts.',
                  imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000'
                }
              ]
            }
          },
          {
            name: 'Concept-to-Completion Services',
            slug: 'concept-to-completion-services',
            description: 'End-to-end design and build coordination, managing everything from architectural drawings to key handover.',
            subtitle: 'Seamless turnkey service',
            order: 2,
            items: {
              create: [
                {
                  title: 'Turnkey Project Execution',
                  about: 'We manage materials procurement, contractors, construction permits, and fine styling for a worry-free experience.',
                  keyLine: 'Leave all the hard work to us.',
                  imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000'
                }
              ]
            }
          },
          {
            name: 'Service & Care Programs',
            slug: 'service-care-programs',
            description: 'Post-completion maintenance and care packages to keep your premium interiors and fixtures pristine.',
            subtitle: 'Long-term support',
            order: 3,
            items: {
              create: [
                {
                  title: 'Jade Care Guarantee',
                  about: 'Scheduled inspections, hinge adjustment, surface touch-ups, and fabric care programs.',
                  keyLine: 'We care for your home long after keys are handed over.',
                  imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1000'
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('Seeding product categories...');
  const catKitchen = await prisma.productCategory.create({
    data: {
      name: 'Kitchen',
      slug: 'kitchen',
      image: 'https://res.cloudinary.com/djtrqqnll/image/upload/v1778698836/jade/amsvbkmxdbtpwhbnucxs.avif',
      order: 0
    }
  });
  const catWardrobe = await prisma.productCategory.create({
    data: {
      name: 'Wardrobe',
      slug: 'wardrobe',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600',
      order: 1
    }
  });
  const catTvCabinet = await prisma.productCategory.create({
    data: {
      name: 'Tv-cabinet',
      slug: 'tv-cabinet',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600',
      order: 2
    }
  });
  const catHomeFurnishes = await prisma.productCategory.create({
    data: {
      name: 'Home Furnishes',
      slug: 'home-furnishes',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600',
      order: 3
    }
  });

  console.log('Seeding blogs...');
  await prisma.blog.createMany({
    data: [
      {
        title: "The Art of Minimalist Living: Designing for Peace and Purpose",
        slug: "art-of-minimalist-living",
        coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000",
        description: "How decluttering your space and focusing on essential elements can transform your daily life and productivity."
      },
      {
        title: "Understanding Spatial Flow: Designing Intuitive Transitions",
        slug: "understanding-spatial-flow",
        coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
        description: "Tips and techniques for organizing layout configurations to allow seamless movement and visual connections."
      },
      {
        title: "Material Harmony: Blending Wood, Metal, and Stone",
        slug: "material-harmony-wood-metal-stone",
        coverImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000",
        description: "A guide on selecting contrasting textures to create warm, inviting, and layered high-end residential interiors."
      },
      {
        title: "Lighting as an Experience: Sculpting with Illumination",
        slug: "lighting-as-an-experience",
        coverImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000",
        description: "Explore the layers of ambient, task, and accent lighting that shape the perception of premium home environments."
      }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
