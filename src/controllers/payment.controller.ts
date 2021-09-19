import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
// module.exports = {
//     payment: async (req, res, next) => {
//         res.status(200).send('You have a total of: 2400$');
//     },
// };

export const payment = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('You have a total of: 2400$');
};
