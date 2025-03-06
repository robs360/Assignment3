import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../modules/User/user.model";

const auth = (...requireRole: string[]) => {
    return async (req: any, res: any, next: any) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                console.log("1st",token)
                return next({ statusCode: StatusCodes.UNAUTHORIZED, message: "You are not authorized!" });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            const { email, role } = decoded;
            
            const user = await userModel.findOne({ email });

            if (!user) {
                console.log("2st")
                return next({ statusCode: StatusCodes.FORBIDDEN, message: "You are not authorized!" });
            }
          
            if (user.isBlocked) {
                console.log("3st")
                return next({ statusCode: StatusCodes.FORBIDDEN, message: "You are not authorized!" });
            }
            
            if (requireRole.length && !requireRole.includes(role)) {
                console.log("4st")
                return next({ statusCode: StatusCodes.FORBIDDEN, message: "You do not have permission!" });
            }
            
            req.user = decoded;
            next();
        }
        catch (err) {
            next({ statusCode: StatusCodes.UNAUTHORIZED, message: "Invalid token!" });
        }
    }
}
export default auth