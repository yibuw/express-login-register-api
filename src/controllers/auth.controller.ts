import createError from 'http-errors';
import { authSchema } from '@helpers/validation_schema';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@helpers/jwt';
import UserServiceImpl from '@service/user.service';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        // validation
        const { name: name_norm, email: email_norm } = await authSchema.validateAsync({
            name,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await UserServiceImpl.register({
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
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const { email: email_norm } = await authSchema.validateAsync({
            email,
            password,
        });

        const result = await UserServiceImpl.login({ email_norm, password });

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);
        res.status(200).send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
