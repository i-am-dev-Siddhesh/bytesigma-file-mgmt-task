"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.checkApiKey = void 0;
const index_1 = require("../utils/index");
const checkApiKey = (req, res, next) => {
    var _a;
    try {
        const apiKey = process.env.API_KEY;
        if (!req.headers.apikey || ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.apikey) !== apiKey) {
            return res.status(403).json((0, index_1.forbiddenError)());
        }
        return next();
    }
    catch (error) {
        return res.status(500).json((0, index_1.generalError)(error));
    }
};
exports.checkApiKey = checkApiKey;
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).json({ message: error === null || error === void 0 ? void 0 : error.details[0].message });
    }
    else {
        next();
    }
};
exports.validate = validate;
