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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObjectFromS3 = exports.uploadToS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const index_1 = require("../utils/index");
const unlinkFile = util_1.default.promisify(fs_1.default.unlink);
const uploadToS3 = (file, folderName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const s3 = new aws_sdk_1.default.S3({
            region: process.env.AWS_REGION,
        });
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const fileStream = fs_1.default.createReadStream(file === null || file === void 0 ? void 0 : file.path);
        const fileType = file.mimetype;
        const Key = folderName
            ? `${folderName}/${file.filename}.${fileType.split('/').pop()}`
            : `${file.filename}.${fileType.split('/').pop()}`;
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: Key,
            ContentType: fileType,
        };
        // image {
        //   [1]   fieldname: 'images',
        //   [1]   originalname: 'Untitled.jpg',
        //   [1]   encoding: '7bit',
        //   [1]   mimetype: 'image/jpeg',
        //   [1]   destination: 'uploads/',
        //   [1]   filename: 'da3a3a3584fced04c2dc72b4e8ade46f',
        //   [1]   path: 'uploads\\da3a3a3584fced04c2dc72b4e8ade46f',
        //   [1]   size: 9281
        //   [1] }
        const resp = yield s3.upload(uploadParams).promise();
        return {
            resp,
            fileName: (0, index_1.generateFileName)(file),
        };
    }
    catch (error) {
        throw error;
    }
    finally {
        yield unlinkFile(file.path);
    }
});
exports.uploadToS3 = uploadToS3;
const deleteObjectFromS3 = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!url) {
            return;
        }
        const s3 = new aws_sdk_1.default.S3({
            region: process.env.AWS_REGION,
        });
        let key = (0, index_1.getPath)(url).substring(1);
        const bucket = process.env.AWS_S3_BUCKET_NAME;
        const params = {
            Bucket: bucket,
            Key: key,
        };
        return new Promise((resolve, reject) => {
            s3.deleteObject(params, function (err, data) {
                // @ts-ignore: types srror for request
                if (err)
                    reject(err, err.stack);
                else
                    resolve(true);
            });
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteObjectFromS3 = deleteObjectFromS3;
