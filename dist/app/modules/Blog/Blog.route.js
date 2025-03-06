"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Blog_controller_1 = require("./Blog.controller");
const router = express_1.default.Router();
router.get('/', Blog_controller_1.blogController.getAllBlog);
router.post("/", (0, auth_1.default)("user"), Blog_controller_1.blogController.createBlog);
router.get("/:id", Blog_controller_1.blogController.getSingleBlog);
router.patch('/:id', (0, auth_1.default)('user'), Blog_controller_1.blogController.updateSingleBlog);
router.delete('/:id', (0, auth_1.default)('user'), Blog_controller_1.blogController.deleteSingleBlog);
exports.blogRoutes = router;
