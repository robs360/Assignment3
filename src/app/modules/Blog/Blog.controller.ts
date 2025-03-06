import { RequestHandler } from "express";
import { blogServices } from "./Blog.services";

const createBlog = async (req: any, res: any) => {
    try {
        const user = req.user;
        const content = req.body
        const result = await blogServices.createBlogIntoDB(content, user)
        res.status(200).json({
            success: true,
            message: "Blog successfully created",
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

const getAllBlog:RequestHandler=async (req,res)=>{
    try{
        const result = await blogServices.getAllBlogsForDb(req?.query);
        res.status(200).json({
          success: true,
          message: "get  all blogs",
          data: result,})
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
}
const getSingleBlog:RequestHandler=async (req,res)=>{
    try{
        const id=req.params.id
        const result=await blogServices.getSingleBlogForDb(id)
        res.status(200).json({
           success: true,
           message: "Blog successfully getted",
           data: result,
       });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
}

const updateSingleBlog:RequestHandler=async (req,res)=>{
    try{
        const id=req.params.id
        const updatedDoc=req.body
        const result=await blogServices.updateBlogIntoDB(id,updatedDoc)
        res.status(200).json({
           success: true,
           message: "Blog updated successfully",
           data: result,
       });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
}

const deleteSingleBlog:RequestHandler=async (req,res)=>{
    try{
        const id=req.params.id
        
        const result=await blogServices.deleteBlogFromDB(id)
        res.status(200).json({
           success: true,
           message: "Blog deleted successfully",
           data: result,
       });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Validation error",
            statusCode: 400,
        });
    }
}

export const blogController={
    createBlog,getSingleBlog,getAllBlog,
    updateSingleBlog,deleteSingleBlog
}