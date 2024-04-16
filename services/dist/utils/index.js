"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = exports.getFilenameFromUrl = exports.getPath = exports.forbiddenError = exports.generalErrorStatusCode = exports.generalError = exports.HttpException = void 0;
const url_1 = require("url");
const constants_1 = require("../constants");
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
const generalError = (error) => {
    const message = error.message || constants_1.GENERAL_ERROR_MESSAGE;
    return {
        status: false,
        error: message,
    };
};
exports.generalError = generalError;
const generalErrorStatusCode = (error) => {
    const code = (error === null || error === void 0 ? void 0 : error.status_code) || 500;
    return code;
};
exports.generalErrorStatusCode = generalErrorStatusCode;
const forbiddenError = () => ({
    status: false,
    message: constants_1.ACCESS_DENIED_MESSAGE,
});
exports.forbiddenError = forbiddenError;
const getPath = (url) => {
    return new url_1.URL(url).pathname;
};
exports.getPath = getPath;
function getFilenameFromUrl(url) {
    const pathname = new url_1.URL(url).pathname;
    const index = pathname.lastIndexOf('/');
    return pathname.substring(index + 1);
}
exports.getFilenameFromUrl = getFilenameFromUrl;
// Function to get the extension from mimetype for image files
function getExtension(mimetype) {
    const mimeToExtensionMap = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/bmp': '.bmp',
        'image/webp': '.webp',
        'image/svg+xml': '.svg',
    };
    return mimeToExtensionMap[mimetype] || ''; // Return empty string if no mapping found
}
// Function to generate a filename for image files
function generateFileName(file) {
    const timestamp = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const extension = getExtension(file.mimetype); // Get extension based on mimetype
    let originalName = file.originalname || 'untitled'; // Use original name or 'untitled' if not available
    // If the original name contains an extension, separate it from the filename
    const dotIndex = originalName.lastIndexOf('.');
    if (dotIndex !== -1) {
        originalName = originalName.substring(0, dotIndex); // Extract filename without extension
    }
    return `${originalName}-${timestamp}${extension}`;
}
exports.generateFileName = generateFileName;
