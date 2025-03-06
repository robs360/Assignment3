import { RequestHandler } from "express";
import { adminServices } from "./admin.services";

const deleteSingleBlog: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id

        const result = await adminServices.deleteBlockFromDB(id)
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
}


const blockUser: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await adminServices.blockUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: "User blocked successfully ",
            data:result
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
}
export const adminContllors = {
    deleteSingleBlog,blockUser
};