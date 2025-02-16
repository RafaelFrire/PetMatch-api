import { Request, Response } from "express";
import BlogService from "./blog.service";

class BlogController {
  blogService: BlogService = new BlogService();

  async getUniqueArticle(req: Request, res: Response) {
    try {
      const article = await this.blogService.getArticleBySlug(req, res);
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getArticles(req: Request, res: Response) {
    try {
      const articles = await this.blogService.getArticles(req, res);

      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async createArticle(req: Request, res: Response) {
    try {
      const article = await this.blogService.createArticle(req, res);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default BlogController;
