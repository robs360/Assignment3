import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";

const userShema = new Schema<Tuser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
},
    {
        timestamps: true,
    }
)

export const userModel = model<Tuser>("user", userShema)