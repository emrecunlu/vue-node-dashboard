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
exports.getAll = exports.update = exports.remove = exports.insert = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../models/ApiError"));
const prisma = new client_1.PrismaClient();
const insert = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.body;
        const menu = yield prisma.menu.findFirst({
            where: {
                slug,
            },
        });
        if (menu) {
            throw new ApiError_1.default('Adres zaten kayıtlı');
        }
        const inserted = yield prisma.menu.create({
            data: req.body,
        });
        res.send(inserted);
    }
    catch (err) {
        next(err);
    }
});
exports.insert = insert;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const menu = yield prisma.menu.findFirst({
            where: { id },
        });
        if (!menu) {
            throw new ApiError_1.default('Menü bulunamadı');
        }
        const deleted = yield prisma.menu.delete({
            where: {
                id,
            },
        });
        res.send(deleted);
    }
    catch (err) {
        next(err);
    }
});
exports.remove = remove;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const menu = yield prisma.menu.findFirst({
            where: { id },
        });
        if (!menu) {
            throw new ApiError_1.default('Menü bulunamadı');
        }
        const updated = yield prisma.menu.update({
            data: req.body,
            where: {
                id,
            },
        });
        res.send(updated);
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menus = yield prisma.menu.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                Content: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
        });
        const lists = menus.map((menu) => {
            const obj = menu;
            obj['children'] = obj['Content'];
            delete obj['Content'];
            return obj;
        });
        res.send(lists);
    }
    catch (err) {
        next(err);
    }
});
exports.getAll = getAll;
