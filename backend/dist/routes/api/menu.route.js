"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("../../controllers/api/menu.controller");
const menu_validation_1 = require("../../validations/menu.validation");
const Validator_1 = __importDefault(require("../../middlewares/Validator"));
const router = (0, express_1.Router)();
router.get('/', menu_controller_1.getAll);
router.post('/add', (0, Validator_1.default)(menu_validation_1.insertSchema), menu_controller_1.insert);
router.delete('/', (0, Validator_1.default)(menu_validation_1.deleteSchema), menu_controller_1.remove);
router.put('/', (0, Validator_1.default)(menu_validation_1.updateSchema), menu_controller_1.update);
exports.default = router;
