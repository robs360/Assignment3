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
exports.blogServices = void 0;
const queryBulder_1 = __importDefault(require("../../builder/queryBulder"));
const user_model_1 = require("../User/user.model");
const Blog_model_1 = require("./Blog.model");
const mongodb_1 = require("mongodb");
const createBlogIntoDB = (playload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield user_model_1.userModel.findOne({ email: user.email });
    if (!author) {
        throw new Error("author is not found");
    }
    playload.author = author._id;
    const result = yield Blog_model_1.blogsModel.create(playload);
    return result;
});
const getSingleBlogForDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog_model_1.blogsModel.findById(id);
    if (!result) {
        throw new Error("Data not found");
    }
    return result;
});
const getAllBlogsForDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const blogQuerys = new queryBulder_1.default(Blog_model_1.blogsModel.find().populate("author"), query)
        .search(["title"])
        .filter()
        .sort()
        .sortOrder();
    const result = yield blogQuerys.modelQuery;
    console.log("result ", result);
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: new mongodb_1.ObjectId(id) };
    const result = yield Blog_model_1.blogsModel.deleteOne(query);
    return result;
});
const updateBlogIntoDB = (id, updatedDoc) => __awaiter(void 0, void 0, void 0, function* () {
    const option = { new: true };
    const result = yield Blog_model_1.blogsModel.findByIdAndUpdate(id, updatedDoc, option);
    return result;
});
exports.blogServices = {
    createBlogIntoDB, updateBlogIntoDB,
    deleteBlogFromDB, getSingleBlogForDb,
    getAllBlogsForDb
};
