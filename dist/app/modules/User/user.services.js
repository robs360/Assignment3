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
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserIntoDB = (playload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.userModel.findOne({ email: playload.email });
    if (isUserExists) {
        throw new Error("User Already Exits");
    }
    const result = yield user_model_1.userModel.create(playload);
    console.log(result);
    return result;
});
const loginUserIntoDB = (playload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.userModel.findOne({ email: playload.email });
    if (!findUser || findUser.password !== playload.password) {
        throw new Error("Invalid email or password");
    }
    if (findUser.isBlocked) {
        throw new Error("User is blocked");
    }
    const token = jsonwebtoken_1.default.sign({ email: findUser.email, role: findUser.role }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
    return { token };
});
const getSingleUserForDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findById(id).select("-password");
    if (!result) {
        throw new Error("user is not fuound ");
    }
    return result;
});
const getAllUserForDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find({});
    return result;
});
exports.userServices = {
    registerUserIntoDB, getSingleUserForDb,
    loginUserIntoDB, getAllUserForDb
};
