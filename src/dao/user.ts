import createError from 'http-errors';
import { db } from '@database/index';

class UserDAO {
    async create(data: any) {
        try {
            const res = await db.user.create({
                data,
            });
            return res;
        } catch (error: any) {
            throw new createError.BadRequest(error);
        }
    }
    async getByUnique(email: string) {
        try {
            const res = await db.user.findUnique({
                where: {
                    email,
                },
            });
            return res;
        } catch (error: any) {
            throw new createError.BadRequest(error);
        }
    }
    async getAll() {
        try {
            const res = await db.user.findMany({});
            return res;
        } catch (error: any) {
            throw new createError.BadRequest(error);
        }
    }
    async deleteByUnique(email: string) {
        try {
            const res = await db.user.deleteByUnique({
                where: {
                    email,
                },
            });
            return res;
        } catch (error: any) {
            throw new createError.BadRequest(error);
        }
    }
    async deleteAll() {
        try {
            const res = await db.user.deleteMany({});
            return res;
        } catch (error: any) {
            throw new createError.BadRequest(error);
        }
    }
    async updateByUnique(email: string, data: any) {
        try {
            const res = await db.user.update({
                where: {
                    email,
                },
                data,
            });
            return res;
        } catch (error: any) {
            throw new createError.BadRequest(error);
        }
    }
}

export default new UserDAO();
