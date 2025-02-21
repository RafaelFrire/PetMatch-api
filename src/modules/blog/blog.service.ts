import { Request, Response } from "express";
import ArticleDto from "../../dto/ArticleDto";
import ArticleSectionDto from "../../dto/ArticleSectionDto";
import BlogRepository from "./blog.repository";
import prismaClient from "../../database";

class BlogService {
  blogRepository: BlogRepository = new BlogRepository();

  async getArticleBySlug(req: Request, res: Response) {}

  async getArticles(req: Request, res: Response) {}

  async createArticle(req: Request, res: Response) {
    const article = req.body.article as ArticleDto;
    const sections = req.body.sections as ArticleSectionDto[];
    console.log("data:", article.ongId);

    if (!article || !sections) {
      return res.status(400).json({ message: "Invalid data" });
    }
    try {
      const findOng = await prismaClient.ong.findUnique({
        where: { id: article.ongId },
      });

      if (!findOng) {
        return res.status(404).json({ message: "Ong not found" });
      }

      const newArticle = await this.blogRepository.createArticle(
        article,
        sections
      );
      return newArticle;
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default BlogService;
