"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controller_1 = require("../../controllers/api/content.controller");
const Validator_1 = __importDefault(require("../../middlewares/Validator"));
const content_validation_1 = require("../../validations/content.validation");
const router = (0, express_1.Router)();
router.post('/add', content_controller_1.insert);
router.get('/:slug', content_controller_1.get);
router.delete('/', (0, Validator_1.default)(content_validation_1.deleteSchema), content_controller_1.remove);
router.put('/', content_controller_1.update);
exports.default = router;
