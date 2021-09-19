"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.db = prisma;
// module.exports = {
// db: prisma,
// };
