import { model, Schema } from "mongoose";
import { TBlogs } from "./Blog.interface";


const blogSchema=new Schema<TBlogs>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: false },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  })
 
  export const blogsModel = model<TBlogs>("Blogs", blogSchema);