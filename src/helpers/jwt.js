//  demo https://github.com/trulymittal/API-Authentication-NodeJs/blob/master/helpers/jwt_helper.js

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
// const client = require('./init_redis');
const { verifyAccessToken } = require('../middleware/verifyAccessToken');

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.JWT_SECRET;
      const options = {
        expiresIn: '1m',
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken,
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1m',
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          // reject(err)
          reject(createError.InternalServerError());
        }

        resolve(token);
        // client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
        //   if (err) {
        //     console.log(err.message);
        //     reject(createError.InternalServerError());
        //     return;
        //   }
        //   resolve(token);
        // });
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          //   const userId = payload.aud;
          resolve(payload);

          //   client.GET(userId, (err, result) => {
          //     if (err) {
          //       console.log(err.message);
          //       reject(createError.InternalServerError());
          //       return;
          //     }
          //     if (refreshToken === result) return resolve(userId);
          //     reject(createError.Unauthorized());
          //   });
        }
      );
    });
  },
};
