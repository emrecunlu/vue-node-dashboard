"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_codes_1 = require("http-status-codes/build/cjs/status-codes");
const ApiError_1 = __importDefault(require("../models/ApiError"));
function ErrorHandler(err, req, res, next) {
    if (err instanceof ApiError_1.default) {
        return res.status(err.status).send({
            message: err.message,
            description: err.description
        });
    }
    return res.status(status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Server Hatası',
        description: 'Kaynağı bilinemeyen bir hatayla karşılaşıldı'
    });
}
exports.default = ErrorHandler;
