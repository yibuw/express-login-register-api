import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['authorization']) return next(new createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, process.env.JWT_SECRET!, (err, payload) => {
        if (err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(new createError.Unauthorized(message));
        }
        // req.payload = payload;
        next();
    });
};
