const { PrismaClient } = require('@prisma/client');

// Singleton pattern: reuse one Prisma instance across all route files.
// Multiple PrismaClient instances create multiple connection pools which
// can exhaust database connections under load.
const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

module.exports = prisma;
