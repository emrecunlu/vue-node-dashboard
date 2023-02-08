"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/api/auth.controller");
const Validator_1 = __importDefault(require("../../middlewares/Validator"));
const auth_validation_1 = require("../../validations/auth.validation");
const router = (0, express_1.Router)();
router.post('/register', (0, Validator_1.default)(auth_validation_1.registerSchema), auth_controller_1.register);
router.post('/login', (0, Validator_1.default)(auth_validation_1.loginSchema), auth_controller_1.login);
router.post('/token', (0, Validator_1.default)(auth_validation_1.refreshSchema), auth_controller_1.token);
exports.default = router;
