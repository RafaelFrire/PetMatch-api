import { Request, Response, Router } from "express";
import BlogController from "./blog.controller";
import ValidateJwt from "../../middleware/ValidateToken";
import upload from "../../config/multerConfig";


const router = Router();

const blogController:BlogController = new BlogController();


router.post("/api/articles/create", (req:Request, res:Response) =>{
    blogController.createArticle(req, res);
});


export default router;