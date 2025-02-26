import { Request, Response } from "express";
import BlogService from "./blog.service";
import { SuccessCode } from "../../constants/sucessCode";
import ErrorCode from "../../constants/errorCode";

class BlogController {
  blogService: BlogService = new BlogService();

  async getArticleById(req: Request, res: Response) {
    try {
      const article = await this.blogService.getArticleById(req, res);
      return article;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async getArticleBySlug(req: Request, res: Response) {
    try {
      const article = await this.blogService.getArticleBySlug(req, res);
      return article;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async getArticles(req: Request, res: Response) {
    try {
      const articles = await this.blogService.getArticles(req, res);
      return articles;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async createArticle(req: Request, res: Response) {
    try {
      const article = await this.blogService.createArticle(req, res);
      return article;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }
}

export default BlogController;
