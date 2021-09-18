const user = require('../dao/user');
const createError = require('http-errors');
const { signAccessToken, signRefreshToken } = require('../helpers/jwt');
const bcrypt = require('bcrypt');
class UserService {
  async register(info) {
    try {
      const alreadyExistsUser = await user.getByUnique(info.email_norm);

      if (alreadyExistsUser) {
        throw createError.Conflict(`${info.email} is already been registered`);
      }

      const savedUser = await user.create({
        password: info.hashedPassword,
        name: info.name,
        email: info.email,
        name_norm: info.name_norm,
        email_norm: info.email_norm,
      });

      const accessToken = await signAccessToken(info.email_norm);
      const refreshToken = await signRefreshToken(info.email_norm);

      if (savedUser) {
        return {
          message: 'Thanks for registering',
          accessToken,
          refreshToken,
        };
      } else {
        throw createError.BadRequest('create user failure');
      }
    } catch (error) {
      throw createError.BadRequest(error);
    }
  }

  async login({ email_norm, password }) {
    try {
      const userWithEmail = await user.getByUnique(email_norm);

      if (!userWithEmail) {
        throw createError.NotFound('User not registered');
      }

      if (!(await bcrypt.compare(password, userWithEmail.password))) {
        throw createError.Unauthorized('Username/password not valid');
      }

      const accessToken = await signAccessToken(email_norm);
      const refreshToken = await signRefreshToken(email_norm);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
        throw createError.BadRequest(error);
    }
  }

  async findByEmail(email) {
    return await user.getByUnique(email);
  }
}

module.exports = new UserService();
