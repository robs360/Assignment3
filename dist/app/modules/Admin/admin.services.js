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
exports.adminServices = void 0;
const mongodb_1 = require("mongodb");
const Blog_model_1 = require("../Blog/Blog.model");
const user_model_1 = require("../User/user.model");
const deleteBlockFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result2 = yield user_model_1.userModel.findById(id);
    const checkUserStatus = result2 === null || result2 === void 0 ? void 0 : result2.isBlocked;
    if (checkUserStatus) {
        throw new Error("User Already Block");
    }
    const query = { _id: new mongodb_1.ObjectId(id) };
    const result = yield Blog_model_1.blogsModel.deleteOne(query);
    return result;
});
const blockUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result1 = yield user_model_1.userModel.findById(id);
    if (!result1) {
        throw new Error("User not found");
    }
    const checkUserStatus = result1 === null || result1 === void 0 ? void 0 : result1.isBlocked;
    if (checkUserStatus) {
        throw new Error("User is already blocked");
    }
    const option = { new: true };
    const result = yield user_model_1.userModel.findByIdAndUpdate(id, {
        isBlocked: true,
    }, option);
    return result;
});
exports.adminServices = {
    deleteBlockFromDB, blockUserFromDB
};
