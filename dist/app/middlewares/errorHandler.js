"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const gobalErrorHandilers = (err, req, res, next) => {
    const statusCode = err.statusCode;
    const message = err.message || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ success: false, message, erorr: err });
    return;
};
exports.default = gobalErrorHandilers;
