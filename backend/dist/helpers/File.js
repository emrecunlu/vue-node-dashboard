"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = void 0;
const fs_1 = __importDefault(require("fs"));
const removeFile = (fileName) => {
    const file = `${process.env.STATIC_DIR}/${fileName}`;
    const fileExist = fs_1.default.existsSync(file);
    if (fileExist) {
        fs_1.default.unlinkSync(file);
    }
};
exports.removeFile = removeFile;
