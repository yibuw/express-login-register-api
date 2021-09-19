import UserDAO from 'dao/user';
import createError from 'http-errors';
import { signAccessToken, signRefreshToken } from 'helpers/jwt';
import bcrypt from 'bcrypt';
import { ITokenInfo, IUserInfo, IUserLogin, IUserService } from './user.interface';
import { User } from '@prisma/client';

class UserServiceImpl implements IUserService {
    async register(info: IUserInfo): Promise<ITokenInfo> {
        try {
            const alreadyExistsUser = await UserDAO.getByUnique(info.email_norm);

            if (alreadyExistsUser) {
                throw new createError.Conflict(`${info.email} is already been registered`);
            }

            const data = {
                password: info.hashedPassword,
                name: info.name,
                email: info.email,
                name_norm: info.name_norm,
                email_norm: info.email_norm,
            } as User;

            const savedUser = await UserDAO.create(data);

            const accessToken = await signAccessToken(info.email_norm);
            const refreshToken = await signRefreshToken(info.email_norm);

            if (savedUser) {
                return {
                    message: 'Thanks for registering',
                    accessToken,
                    refreshToken,
                };
            } else {
                throw new createError.BadRequest('create user failure');
            }
        } catch (error: any) {
            throw new createError.BadRequest(error);
        }
    }
    async login(info: IUserLogin): Promise<Omit<ITokenInfo, 'message'>> {
        try {
            const userWithEmail = await UserDAO.getByUnique(info.email_norm);
            if (!userWithEmail) {
                throw new createError.NotFound('User not registered');
            }
            if (!(await bcrypt.compare(info.password, userWithEmail.password))) {
                throw new createError.Unauthorized('Username/password not valid');
            }
            const accessToken = await signAccessToken(info.email_norm);
            const refreshToken = await signRefreshToken(info.email_norm);
            return {
                accessToken,
                refreshToken,
            };
        } catch (error: any) {
            throw new createError.BadRequest(error);
        }
    }
    // async register(info) {
    //     try {
    //         const alreadyExistsUser = await user.getByUnique(info.email_norm);

    //         if (alreadyExistsUser) {
    //             throw new createError.Conflict(`${info.email} is already been registered`);
    //         }

    //         const savedUser = await user.create({
    //             password: info.hashedPassword,
    //             name: info.name,
    //             email: info.email,
    //             name_norm: info.name_norm,
    //             email_norm: info.email_norm,
    //         });

    //         const accessToken = await signAccessToken(info.email_norm);
    //         const refreshToken = await signRefreshToken(info.email_norm);

    //         if (savedUser) {
    //             return {
    //                 message: 'Thanks for registering',
    //                 accessToken,
    //                 refreshToken,
    //             };
    //         } else {
    //             throw new createError.BadRequest('create user failure');
    //         }
    //     } catch (error) {
    //         throw new createError.BadRequest(error);
    //     }
    // }

    // async login({ email_norm, password }) {
    //     try {
    //         const userWithEmail = await user.getByUnique(email_norm);

    //         if (!userWithEmail) {
    //             throw new createError.NotFound('User not registered');
    //         }

    //         if (!(await bcrypt.compare(password, userWithEmail.password))) {
    //             throw new createError.Unauthorized('Username/password not valid');
    //         }

    //         const accessToken = await signAccessToken(email_norm);
    //         const refreshToken = await signRefreshToken(email_norm);

    //         return {
    //             accessToken,
    //             refreshToken,
    //         };
    //     } catch (error) {
    //         throw new createError.BadRequest(error);
    //     }
    // }
}

export default new UserServiceImpl();
