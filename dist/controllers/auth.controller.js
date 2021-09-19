"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const validation_schema_1 = require("@helpers/validation_schema");
const jwt_1 = require("@helpers/jwt");
const user_service_1 = __importDefault(require("@service/user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // validation
        const { name: name_norm, email: email_norm } = yield validation_schema_1.authSchema.validateAsync({
            name,
            email,
            password,
        });
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const result = yield user_service_1.default.register({
            name,
            name_norm,
            email,
            email_norm,
            password,
            hashedPassword,
        });
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { email: email_norm } = yield validation_schema_1.authSchema.validateAsync({
            email,
            password,
        });
        const result = yield user_service_1.default.login({ email_norm, password });
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            throw new http_errors_1.default.BadRequest();
        const userId = yield (0, jwt_1.verifyRefreshToken)(refreshToken);
        const accessToken = yield (0, jwt_1.signAccessToken)(userId);
        const refToken = yield (0, jwt_1.signRefreshToken)(userId);
        res.status(200).send({ accessToken: accessToken, refreshToken: refToken });
    }
    catch (error) {
        next(error);
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            throw new http_errors_1.default.BadRequest();
        const userId = yield (0, jwt_1.verifyRefreshToken)(refreshToken);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
