import express from "express";
import { userRouter } from "../modules/User/user.route";
import { blogRoutes } from "../modules/Blog/Blog.route";
import { adminRouter } from "../modules/Admin/admin.route";

const router = express.Router();

const modulesRouter=[
    { path:'/auth',   route:userRouter },
     
    { path: "/blogs", route: blogRoutes },
     
    { path: "/admin", route: adminRouter },
]
modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;