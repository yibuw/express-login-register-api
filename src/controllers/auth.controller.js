const createError = require('http-errors');
const { authSchema } = require('../helpers/validation_schema');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt');
const UserService = require('../service/user.service');
const bcrypt = require('bcrypt');

module.exports = {
  /**
   * /api/v1/auth/register
   * @param {*} req
   * @param {*} res
   */
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      // validation
      const { name: name_norm, email: email_norm } =
        await authSchema.validateAsync({
          name,
          email,
          password,
        });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await UserService.register({
        name,
        name_norm,
        email,
        email_norm,
        password,
        hashedPassword,
      });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { email: email_norm } = await authSchema.validateAsync({
        email,
        password,
      });

      const result = await UserService.login({ email_norm, password });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message);
          throw createError.InternalServerError();
        }
        console.log(val);
        res.sendStatus(204);
      });
    } catch (error) {
      next(error);
    }
  },
};
