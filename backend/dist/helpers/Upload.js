"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const multer_1 = __importDefault(require("multer"));
const ApiError_1 = __importDefault(require("../models/ApiError"));
const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.STATIC_DIR);
    },
    filename: (req, file, cb) => {
        const fileName = (0, crypto_1.randomUUID)() + '.' + file.mimetype.split('/')[1];
        file.originalname = fileName;
        cb(null, fileName);
    },
});
const Upload = (0, multer_1.default)({
    storage,
    preservePath: true,
    fileFilter(req, file, cb) {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new ApiError_1.default('İzin verilmeyen dosya tipi'));
        }
    },
}).single('image');
exports.default = Upload;
