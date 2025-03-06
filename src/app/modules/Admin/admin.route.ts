import express from "express";


import auth from "../../middlewares/auth";
import { adminContllors } from "./admin.controller";

const router = express.Router();

router.patch("/users/:userId/block", auth("admin"), adminContllors.blockUser);
router.delete("/blogs/:id", auth("admin"), adminContllors.deleteSingleBlog);

export const adminRouter = router;