"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_RUNNING_MESSAGE = exports.GENERAL_ERROR_MESSAGE = exports.NOT_AUTHENTICATED_MESSAGE = exports.ACCESS_DENIED_MESSAGE = exports.__prod__ = void 0;
exports.__prod__ = process.env.SERVER_ENV === 'production';
exports.ACCESS_DENIED_MESSAGE = 'Access to the resource is denied', exports.NOT_AUTHENTICATED_MESSAGE = 'You are not authenticated to perform this action', exports.GENERAL_ERROR_MESSAGE = 'Something went wrong', exports.SERVER_RUNNING_MESSAGE = 'Server is in running state';
