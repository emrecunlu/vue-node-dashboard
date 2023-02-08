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
exports.token = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../models/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const tokens = [];
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const admin = yield prisma.admin.findFirst({
            where: {
                username,
            },
        });
        if (admin) {
            throw new ApiError_1.default('Böyle bir kullanıcı zaten kayıtlı.');
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        yield prisma.admin.create({
            data: Object.assign(Object.assign({}, req.body), { password: passwordHash }),
        });
        res.send({ message: 'Kullanıcı kaydı başarılı.' });
    }
    catch (err) {
        next(err);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield prisma.admin.findFirst({
            where: {
                username,
            },
        });
        if (!user) {
            throw new ApiError_1.default('Kullanıcı adı veya şifre hatalı');
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw new ApiError_1.default('Kullanıcı adı veya şifre hatalı');
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.ACCESS_KEY, {
            expiresIn: process.env.ACCESS_TIME,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_KEY, {
            expiresIn: process.env.REFRESH_TIME,
        });
        tokens.push(refreshToken);
        res.send({
            credentials: {
                name: user.name,
                surname: user.surname,
            },
            message: 'Girişi başarılı',
            accessToken,
            refreshToken,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!tokens.includes(token)) {
            throw new ApiError_1.default('Geçersiz refresh token', http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        jsonwebtoken_1.default.verify(token, process.env.REFRESH_KEY, function (err, user) {
            if (err) {
                next(err);
            }
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                return res
                    .status(http_status_codes_1.StatusCodes.FORBIDDEN)
                    .send({ message: 'Token expired' });
            }
            const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_KEY, {
                expiresIn: process.env.REFRESH_TIME,
            });
            return res.send({ accessToken });
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.token = token;
