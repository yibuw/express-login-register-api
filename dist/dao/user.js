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
const http_errors_1 = __importDefault(require("http-errors"));
const index_1 = require("@database/index");
class UserDAO {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield index_1.db.user.create({
                    data,
                });
                return res;
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(error);
            }
        });
    }
    getByUnique(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield index_1.db.user.findUnique({
                    where: {
                        email,
                    },
                });
                return res;
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(error);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield index_1.db.user.findMany({});
                return res;
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(error);
            }
        });
    }
    deleteByUnique(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield index_1.db.user.deleteByUnique({
                    where: {
                        email,
                    },
                });
                return res;
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(error);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield index_1.db.user.deleteMany({});
                return res;
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(error);
            }
        });
    }
    updateByUnique(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield index_1.db.user.update({
                    where: {
                        email,
                    },
                    data,
                });
                return res;
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(error);
            }
        });
    }
}
exports.default = new UserDAO();
