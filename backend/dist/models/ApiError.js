"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class ApiError extends Error {
    constructor(message, status = http_status_codes_1.StatusCodes.BAD_REQUEST, description) {
        super(message);
        this.message = message;
        this.status = status;
        this.description = description;
    }
}
exports.default = ApiError;
