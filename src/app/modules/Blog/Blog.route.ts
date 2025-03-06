import express from "express"
import auth from "../../middlewares/auth";
import { blogController } from "./Blog.controller";

const router=express.Router()
router.get('/',blogController.getAllBlog)
router.post("/", auth("user"), blogController.createBlog );
router.get("/:id", blogController.getSingleBlog );
router.patch('/:id', auth('user'),blogController.updateSingleBlog)
router.delete('/:id',auth('user'), blogController.deleteSingleBlog)
export const blogRoutes=router