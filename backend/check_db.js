const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const admins = await prisma.admin.findMany();
  console.log("Admins:", admins);
  
  const projects = await prisma.project.count();
  console.log("Projects count:", projects);
  
  const services = await prisma.serviceItem.count();
  console.log("Services count:", services);
}
check().finally(() => prisma.$disconnect());
