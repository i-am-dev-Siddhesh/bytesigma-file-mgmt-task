"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findImages = exports.createImages = void 0;
const prisma_1 = require("../clients/prisma");
const s3_1 = require("../clients/s3");
const index_1 = require("../utils/index");
// @desc    Upload images to server
// @route   POST /v1/upload/images
// @access  Public
const createImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resp = [];
        if (req.files) {
            // @ts-ignore
            const imagesFiles = req.files.images;
            if (imagesFiles) {
                for (let i = 0; i < imagesFiles.length; i++) {
                    const image = imagesFiles[i];
                    const result = yield (0, s3_1.uploadToS3)(image, 'images');
                    resp.push({
                        url: result.resp.Location,
                        fileName: result.fileName,
                        uploadedDate: new Date().toISOString(),
                    });
                }
            }
        }
        const item = yield prisma_1.prisma.files.createMany({ data: resp });
        return res.status(200).json({ data: item });
    }
    catch (error) {
        let statusCode = 500;
        if (error.status_code) {
            statusCode = error.status_code;
        }
        return res.status(statusCode).json((0, index_1.generalError)(error));
    }
});
exports.createImages = createImages;
// @desc    Find images data
// @route   GET /v1/upload/images
// @access  Public
const findImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield prisma_1.prisma.files.findMany();
        return res.status(200).json({ data: items });
    }
    catch (error) {
        let statusCode = 500;
        if (error.status_code) {
            statusCode = error.status_code;
        }
        return res.status(statusCode).json((0, index_1.generalError)(error));
    }
});
exports.findImages = findImages;
