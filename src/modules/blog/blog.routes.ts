import { Request, Response, Router } from "express";
import BlogController from "./blog.controller";
import ValidateJwt from "../../middleware/ValidateToken";
import upload from "../../config/multerConfig";


const router = Router();

const blogController:BlogController = new BlogController();


router.get("/api/articles", (req:Request, res:Response) =>{
    blogController.getArticles(req, res);
});

router.get("/api/article/:slug/slug", (req:Request, res:Response) =>{
    blogController.getArticleBySlug(req, res);
});

router.get("/api/articles/:id/id", (req:Request, res:Response) =>{
    blogController.getArticleById(req, res);
});

router.post("/api/articles/create", (req:Request, res:Response) =>{
    blogController.createArticle(req, res);
});

export default router;