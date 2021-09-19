"use strict";
//  demo https://github.com/trulymittal/API-Authentication-NodeJs/blob/master/helpers/jwt_helper.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import client = from'./init_redis';
const http_errors_1 = __importDefault(require("http-errors"));
// import { verifyAccessToken } from '../middleware/verifyAccessToken';
const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.JWT_SECRET;
        const options = {
            expiresIn: '1m',
            audience: userId,
        };
        jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(new http_errors_1.default.InternalServerError());
                return;
            }
            resolve(token);
        });
    });
};
exports.signAccessToken = signAccessToken;
//   export const verifyAccessToken =  verifyAccessToken,
const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '1m',
            audience: userId,
        };
        jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                // reject(err)
                reject(new http_errors_1.default.InternalServerError());
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
};
exports.signRefreshToken = signRefreshToken;
const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err)
                return reject(new http_errors_1.default.Unauthorized());
            const userId = payload.aud;
            resolve(userId);
            //   client.GET(userId, (err, result) => {
            //     if (err) {
            //       console.log(err.message);
            //       reject(createError.InternalServerError());
            //       return;
            //     }
            //     if (refreshToken === result) return resolve(userId);
            //     reject(createError.Unauthorized());
            //   });
        });
    });
};
exports.verifyRefreshToken = verifyRefreshToken;
