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
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...requireRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                console.log("1st", token);
                return next({ statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: "You are not authorized!" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const { email, role } = decoded;
            const user = yield user_model_1.userModel.findOne({ email });
            if (!user) {
                console.log("2st");
                return next({ statusCode: http_status_codes_1.StatusCodes.FORBIDDEN, message: "You are not authorized!" });
            }
            if (user.isBlocked) {
                console.log("3st");
                return next({ statusCode: http_status_codes_1.StatusCodes.FORBIDDEN, message: "You are not authorized!" });
            }
            if (requireRole.length && !requireRole.includes(role)) {
                console.log("4st");
                return next({ statusCode: http_status_codes_1.StatusCodes.FORBIDDEN, message: "You do not have permission!" });
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            next({ statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: "Invalid token!" });
        }
    });
};
exports.default = auth;
