import { RequestHandler } from "express";
import { userServices } from "./user.services";
const registerUser: RequestHandler = async (req, res) => {
    try {
        const user = req.body
        const result = await userServices.registerUserIntoDB(user)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            statusCode: 201,
            data: {
                _id: result._id,
                name: result.name,
                email: result.email
            },
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

const loginUser: RequestHandler = async (req, res) => {
    try {
        const userData = req.body
        const result = await userServices.loginUserIntoDB(userData)
        res.status(200).json({
            success: true,
            message: "user login success fully ",
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

const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const result = await userServices.getAllUserForDb();

        res.status(200).json({
            success: true,
            message: "user success fully find",
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


const getSingleUsers: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserForDb(userId);

        res.status(200).json({
            success: true,
            message: "get success fullu single user ",
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
export const userController = {
    registerUser, loginUser,
    getAllUsers,  getSingleUsers
}