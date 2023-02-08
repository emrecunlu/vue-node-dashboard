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
exports.update = exports.remove = exports.get = exports.insert = void 0;
const client_1 = require("@prisma/client");
const Upload_1 = __importDefault(require("../../helpers/Upload"));
const ApiError_1 = __importDefault(require("../../models/ApiError"));
const content_validation_1 = require("../../validations/content.validation");
const http_status_codes_1 = require("http-status-codes");
const File_1 = require("../../helpers/File");
const prisma = new client_1.PrismaClient();
const insert = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, Upload_1.default)(req, res, function (err) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (err) {
                    throw new ApiError_1.default(err, http_status_codes_1.StatusCodes.BAD_REQUEST, 'Dosya yükleme hatası');
                }
                const { error, value } = content_validation_1.insertSchema.validate(req.body, {
                    abortEarly: true,
                });
                if (error) {
                    throw new ApiError_1.default(error.message);
                }
                const menu = yield prisma.menu.findUnique({
                    where: {
                        id: value.menuId,
                    },
                });
                if (!menu) {
                    throw new ApiError_1.default('Menu bulunamadı');
                }
                const inserted = yield prisma.content.create({
                    data: Object.assign(Object.assign({}, value), { image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname }),
                });
                res.send(inserted);
            }
            catch (error) {
                if (req === null || req === void 0 ? void 0 : req.file) {
                    (0, File_1.removeFile)(req.file.originalname);
                }
                next(error);
            }
        });
    });
});
exports.insert = insert;
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const content = yield prisma.content.findFirst({
            where: {
                slug: `/${slug}`,
            },
            include: {
                menu: true,
            },
        });
        if (!content) {
            throw new ApiError_1.default('Sayfa bulunamadı', http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        res.send(content);
    }
    catch (err) {
        next(err);
    }
});
exports.get = get;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const content = yield prisma.content.findUnique({
            where: {
                id,
            },
        });
        if (!content) {
            throw new ApiError_1.default('Lütfen geçerli id giriniz');
        }
        yield prisma.content.delete({
            where: {
                id,
            },
        });
        if (content.image) {
            (0, File_1.removeFile)(content.image);
        }
        res.send({ message: 'Sayfa başarıyla silindi' });
    }
    catch (err) {
        next(err);
    }
});
exports.remove = remove;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, Upload_1.default)(req, res, function (err) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (err) {
                    throw new ApiError_1.default(err, http_status_codes_1.StatusCodes.BAD_REQUEST, 'Dosya yükleme hatası');
                }
                const { error, value } = content_validation_1.updateSchema.validate(req.body, {
                    abortEarly: true,
                });
                if (error) {
                    throw new ApiError_1.default(error.message);
                }
                const content = yield prisma.content.findUnique({
                    where: {
                        id: value.id,
                    },
                });
                if (!content) {
                    throw new ApiError_1.default('Lütfen geçerli id giriniz');
                }
                if (req.file && content.image) {
                    (0, File_1.removeFile)(content.image);
                }
                const updated = yield prisma.content.update({
                    where: {
                        id: value.id,
                    },
                    data: {
                        title: 'changed',
                        image: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname,
                    },
                });
                res.send(updated);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    });
});
exports.update = update;
