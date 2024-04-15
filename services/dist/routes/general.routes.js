"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const middlewares_1 = require("../middlewares");
const general_controller_1 = require("../controller/general.controller");
const router = express_1.default.Router({ mergeParams: true });
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router
    .route('/upload/images')
    .get(middlewares_1.checkApiKey, general_controller_1.findImages)
    .post(middlewares_1.checkApiKey, upload.fields([{ name: 'images' }]), general_controller_1.createImages);
exports.default = router;
