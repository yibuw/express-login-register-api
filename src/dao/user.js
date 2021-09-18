const createError = require('http-errors');
const { db } = require('../database');

class UserDAO {
  constructor() {}
  async create(data) {
    try {
      const res = await db.user.create({
        data,
      });
      return res;
    } catch (error) {
      throw createError.BadRequest(error);
    }
  }
  async getByUnique(email) {
    try {
      const res = await db.user.findUnique({
        where: {
          email,
        },
      });
      return res;
    } catch (error) {
      throw createError.BadRequest(error);
    }
  }
  async getAll() {
    try {
      const res = await db.user.findMany({});
      return res;
    } catch (error) {
      throw createError.BadRequest(error);
    }
  }
  async deleteByUnique(email) {
    try {
      const res = await db.user.deleteByUnique({
        where: {
          email,
        },
      });
      return res;
    } catch (error) {
      throw createError.BadRequest(error);
    }
  }
  async deleteAll() {
    try {
      const res = await prisma.user.deleteMany({});
      return res;
    } catch (error) {
      throw createError.BadRequest(error);
    }
  }
  async updateByUnique(email, data) {
    try {
      const res = await db.user.update({
        where: {
          email,
        },
        data,
      });
      return res;
    } catch (error) {
      throw createError.BadRequest(error);
    }
  }
}
module.exports = new UserDAO();
