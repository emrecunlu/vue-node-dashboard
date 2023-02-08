"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resize = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const resize = (name, width, height) => {
    const mimeType = name.split('.');
    const file = `${process.env.STATIC_DIR}/${name}`;
    const resizedName = `${mimeType[0]}_${width}x${height}.${mimeType[1]}`;
    const resizedFile = `${process.env.STATIC_DIR}/${mimeType[0]}_${width}x${height}.${mimeType[1]}`;
    if (fs_1.default.existsSync(resizedFile)) {
        return resizedName;
    }
    (0, sharp_1.default)(file).resize({ width, height }).toFile(resizedFile);
    return resizedName;
};
exports.resize = resize;
