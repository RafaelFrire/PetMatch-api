import { Request, Response } from "express";

import ArticleDto from "../../dto/ArticleDto";
import ArticleSectionDto from "../../dto/ArticleSectionDto";
import BlogRepository from "./blog.repository";
class BlogService {
  blogRepository: BlogRepository = new BlogRepository();

  async getArticleBySlug(req: Request, res: Response) {


  }

  async getArticles(req: Request, res: Response) {}

  async createArticle(req: Request, res: Response) {
    const article = req.body as ArticleDto;
    const sections = req.body.sections as ArticleSectionDto[];
    console.log("store:",article, sections)

    if (!article || !sections) {
      return res.status(400).json({ message: "Invalid data" });
    }

  }
}

export default BlogService;