"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object().keys({
    name: joi_1.default.string().max(25).min(3).required(),
    surname: joi_1.default.string().max(25).min(3).required(),
    username: joi_1.default.string().max(25).min(3).required(),
    password: joi_1.default.string().max(25).min(5).required(),
});
exports.loginSchema = joi_1.default.object().keys({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.refreshSchema = joi_1.default.object().keys({
    token: joi_1.default.string().required(),
});
