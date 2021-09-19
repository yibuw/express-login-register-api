"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization'])
        return next(new http_errors_1.default.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(new http_errors_1.default.Unauthorized(message));
        }
        // req.payload = payload;
        next();
    });
};
exports.verifyAccessToken = verifyAccessToken;
