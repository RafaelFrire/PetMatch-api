import { Request, Response, Router } from "express";
import BlogController from "./blog.controller";
import ValidateJwt from "../../middleware/ValidateToken";
import upload from "../../config/multerConfig";


const router = Router();

const blogController:BlogController = new BlogController();




export default router;