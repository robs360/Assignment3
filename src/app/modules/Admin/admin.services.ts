import { ObjectId } from "mongodb";
import { blogsModel } from "../Blog/Blog.model";
import { userModel } from "../User/user.model";

const deleteBlockFromDB = async (id: string) => {
    const result2 = await userModel.findById(id);
    const checkUserStatus = result2?.isBlocked;
    if (checkUserStatus) {
        throw new Error("User Already Block");
    }
    const query = { _id: new ObjectId(id) };
    const result = await blogsModel.deleteOne(query);
    return result;
}

const blockUserFromDB = async (id: string) => {
    const result1 = await userModel.findById(id);
    if (!result1) {
        throw new Error("User not found")
    }
    const checkUserStatus = result1?.isBlocked;
    if (checkUserStatus) {
        throw new Error("User is already blocked")
    }
    const option = { new: true };
    const result = await userModel.findByIdAndUpdate(id, {
        isBlocked: true,
    }, option);
    return result
}
export const adminServices = {
    deleteBlockFromDB, blockUserFromDB
}