//  demo https://github.com/trulymittal/API-Authentication-NodeJs/blob/master/helpers/jwt_helper.js

import jwt from 'jsonwebtoken';
// import client = from'./init_redis';
import createError from 'http-errors';
// import { verifyAccessToken } from '../middleware/verifyAccessToken';

export const signAccessToken = (userId: string) => {
    return new Promise<string>((resolve, reject) => {
        const payload = {};
        const secret = process.env.JWT_SECRET!;
        const options = {
            expiresIn: '1m',
            audience: userId,
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(new createError.InternalServerError());
                return;
            }
            resolve(token!);
        });
    });
};

//   export const verifyAccessToken =  verifyAccessToken,
export const signRefreshToken = (userId: string) => {
    return new Promise<string>((resolve, reject) => {
        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET!;
        const options = {
            expiresIn: '1m',
            audience: userId,
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                // reject(err)
                reject(new createError.InternalServerError());
            }

            resolve(token!);
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

export const verifyRefreshToken = (refreshToken: string) => {
    return new Promise<string>((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err, payload) => {
            if (err) return reject(new createError.Unauthorized());
            const userId = payload!.aud;
            resolve(userId as string);

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
