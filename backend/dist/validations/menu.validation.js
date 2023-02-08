"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.deleteSchema = exports.insertSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.insertSchema = joi_1.default.object().keys({
    title: joi_1.default.string().max(255).required(),
    slug: joi_1.default.string().max(255).required(),
    active: joi_1.default.boolean(),
});
exports.deleteSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
});
exports.updateSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
    title: joi_1.default.string().max(255),
    slug: joi_1.default.string().max(255),
    active: joi_1.default.boolean(),
});
