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
const user_1 = __importDefault(require("@dao/user"));
const http_errors_1 = __importDefault(require("http-errors"));
const jwt_1 = require("@helpers/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    register(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alreadyExistsUser = yield user_1.default.getByUnique(info.email_norm);
                if (alreadyExistsUser) {
                    throw new http_errors_1.default.Conflict(`${info.email} is already been registered`);
                }
                const savedUser = yield user_1.default.create({
                    password: info.hashedPassword,
                    name: info.name,
                    email: info.email,
                    name_norm: info.name_norm,
                    email_norm: info.email_norm,
                });
                const accessToken = yield (0, jwt_1.signAccessToken)(info.email_norm);
                const refreshToken = yield (0, jwt_1.signRefreshToken)(info.email_norm);
                if (savedUser) {
                    return {
                        message: 'Thanks for registering',
                        accessToken,
                        refreshToken,
                    };
                }
                else {
                    throw new http_errors_1.default.BadRequest('create user failure');
                }
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(error);
            }
        });
    }
    login(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userWithEmail = yield user_1.default.getByUnique(info.email_norm);
                if (!userWithEmail) {
                    throw new http_errors_1.default.NotFound('User not registered');
                }
                if (!(yield bcrypt_1.default.compare(info.password, userWithEmail.password))) {
                    throw new http_errors_1.default.Unauthorized('Username/password not valid');
                }
                const accessToken = yield (0, jwt_1.signAccessToken)(info.email_norm);
                const refreshToken = yield (0, jwt_1.signRefreshToken)(info.email_norm);
                return {
                    accessToken,
                    refreshToken,
                };
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(error);
            }
        });
    }
}
exports.default = new UserService();
