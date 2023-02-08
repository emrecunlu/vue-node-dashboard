"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Image_1 = require("../../helpers/Image");
const router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.render('index', { resize: Image_1.resize });
});
exports.default = router;
