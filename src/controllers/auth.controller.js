const createError = require('http-errors');
const { authSchema } = require('../helpers/validation_schema');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_helper');
const user = require('../dao/user');
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
      const reqBodyValidated = await authSchema.validateAsync(req.body);
      const alreadyExistsUser = await UserService.findByEmail(
        reqBodyValidated.email
      );

      if (alreadyExistsUser) {
        throw createError.Conflict(`${email} is already been registered`);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const savedUser = await UserService.register({
        name: reqBodyValidated.name,
        email: reqBodyValidated.email,
        password: hashedPassword,
        name_norm: name,
        email_norm: email,
      });

      const accessToken = await signAccessToken(email);
      const refreshToken = await signRefreshToken(email);
      if (savedUser) {
        res.status(200).send({
          message: 'Thanks for registering',
          accessToken,
          refreshToken,
        });
      }
      //   res.json({ message: 'Thanks for registering' });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const reqBodyValidated = await authSchema.validateAsync(req.body);

      const userWithEmail = await UserService.findByEmail(
        reqBodyValidated.email
      );

      if (!userWithEmail) {
        throw createError.NotFound('User not registered');
      }

      if (!(await bcrypt.compare(password, userWithEmail.password))) {
        throw createError.Unauthorized('Username/password not valid');
      }
      const accessToken = await signAccessToken(email);
      const refreshToken = await signRefreshToken(email);
      res.status(200).send({
        accessToken,
        refreshToken,
      });
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
