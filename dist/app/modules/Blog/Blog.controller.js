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
exports.blogController = void 0;
const Blog_services_1 = require("./Blog.services");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const content = req.body;
        const result = yield Blog_services_1.blogServices.createBlogIntoDB(content, user);
        res.status(200).json({
            success: true,
            message: "Blog successfully created",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
});
const getAllBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Blog_services_1.blogServices.getAllBlogsForDb(req === null || req === void 0 ? void 0 : req.query);
        res.status(200).json({
            success: true,
            message: "get  all blogs",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
});
const getSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield Blog_services_1.blogServices.getSingleBlogForDb(id);
        res.status(200).json({
            success: true,
            message: "Blog successfully getted",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
});
const updateSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedDoc = req.body;
        const result = yield Blog_services_1.blogServices.updateBlogIntoDB(id, updatedDoc);
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
});
const deleteSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield Blog_services_1.blogServices.deleteBlogFromDB(id);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
});
exports.blogController = {
    createBlog, getSingleBlog, getAllBlog,
    updateSingleBlog, deleteSingleBlog
};
