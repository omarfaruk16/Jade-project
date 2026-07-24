const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing team members
  await prisma.teamMember.deleteMany({});
  
  const members = [
    { name: 'Dr. M. Shiful Islam', designation: 'Principal Architect', image: 'https://i.pravatar.cc/400?img=11' },
    { name: 'Jaasrti Roslan', designation: 'Senior Designer', image: 'https://i.pravatar.cc/400?img=12' },
    { name: 'Amira', designation: 'Interior Designer', image: 'https://i.pravatar.cc/400?img=13' },
    { name: 'Warsty Roslan', designation: 'Project Manager', image: 'https://i.pravatar.cc/400?img=14' },
    { name: 'Salim Sheikh', designation: 'Visualizer', image: 'https://i.pravatar.cc/400?img=15' }
  ];

  for (const member of members) {
    await prisma.teamMember.create({ data: member });
  }

  console.log('Seeded 5 team members.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
