import queryBuilders from "../../builder/queryBulder";
import { Tuser } from "../User/user.interface";
import { userModel } from "../User/user.model";
import { TBlogs } from "./Blog.interface";
import { blogsModel } from "./Blog.model";
import { ObjectId } from "mongodb";
const createBlogIntoDB=async (playload:TBlogs, user:Partial<Tuser>)=>{
    const author = await userModel.findOne({ email: user.email });
    if (!author) {
      throw new Error("author is not found");
    }
    playload.author = author._id;
    const result = await blogsModel.create(playload);
    return result;
}

const getSingleBlogForDb = async (id: string) => {
    const result = await blogsModel.findById(id);
    if (!result) {
      throw new Error("Data not found");
    }
    return result;
  };
  const getAllBlogsForDb = async (query: Record<string, unknown>) => {
    console.log(query)
    
    const blogQuerys = new queryBuilders(blogsModel.find().populate("author"), query)
      .search(["title"])
      .filter()
      .sort()
      .sortOrder();
    const result = await blogQuerys.modelQuery;
    console.log("result ",result)

    
  };
const deleteBlogFromDB=async (id:string)=>{
    const query = { _id: new ObjectId(id) };
    const result=await blogsModel.deleteOne(query)
    return result 
}

const updateBlogIntoDB=async (id:string,updatedDoc:Partial<TBlogs>)=>{
    const option = { new: true };
    const result=await blogsModel.findByIdAndUpdate(id,updatedDoc,option)
    return result
}
export const blogServices={
    createBlogIntoDB,updateBlogIntoDB,
    deleteBlogFromDB,getSingleBlogForDb,
    getAllBlogsForDb
}