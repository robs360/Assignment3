import { Tuser } from "./user.interface";
import { userModel } from "./user.model";
import jwt from "jsonwebtoken";

const registerUserIntoDB = async (playload: Tuser) => {
    const isUserExists = await userModel.findOne({ email: playload.email })
    if (isUserExists) {
        throw new Error("User Already Exits");
    }

    const result = await userModel.create(playload)
    console.log(result)
    return result

}

const loginUserIntoDB = async (playload: Partial<Tuser>) => {
    const findUser = await userModel.findOne({ email: playload.email })
    if (!findUser || findUser.password !== playload.password) {
        throw new Error("Invalid email or password");
    }
         
    if (findUser.isBlocked) {
        throw new Error("User is blocked");
    }
    const token = jwt.sign(
        { email: findUser.email, role: findUser.role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "3d",
        }
      );

      return {token}
}
const getSingleUserForDb = async (id: string) => {
    const result = await userModel.findById(id).select("-password");
    if (!result) {
      throw new Error("user is not fuound ");
    }
    return result;
  };
  const getAllUserForDb = async () => {
    const result = await userModel.find({});
    return result;
  };
export const userServices = {
    registerUserIntoDB,getSingleUserForDb,
    loginUserIntoDB,getAllUserForDb
}