const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const db = prisma;
// module.exports = {
// db: prisma,
// };
