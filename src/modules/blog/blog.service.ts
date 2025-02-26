import { Request, Response } from "express";
import ArticleDto from "../../dto/ArticleDto";
import ArticleSectionDto from "../../dto/ArticleSectionDto";
import BlogRepository from "./blog.repository";
import prismaClient from "../../database";
import ErrorCode from "../../constants/errorCode";
import { ErrorMessage } from "../../constants/errorMessage";

class BlogService {
  blogRepository: BlogRepository = new BlogRepository();

  async getArticleById(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(ErrorCode.BAD_REQUEST).json({ message: "Invalid id" });
    }
    try {
      const article = await this.blogRepository.getArticleById(id);
      if (!article) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "Article not found" });
      }
      return article;
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getArticleBySlug(req: Request, res: Response) {
    const slug = req.params.slug;

    if (!slug) {
      return res
        .status(ErrorCode.BAD_REQUEST)
        .json({ message: "Invalid slug" });
    }

    try {
      const article = await this.blogRepository.getArticleBySlug(slug);

      if (article === null) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "Article not found" });
      }
      return res.status(200).json(article);
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getArticles(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const articles = await this.blogRepository.getArticles(page, limit);
      
      return res.status(200).json({ articles, page, limit });
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async createArticle(req: Request, res: Response) {
    const article = req.body.article as ArticleDto;
    const sections = req.body.sections as ArticleSectionDto[];

    if (!article || !sections) {
      return res
        .status(ErrorCode.BAD_REQUEST)
        .json({ message: "Invalid data" });
    }
    try {
      const findOng = await prismaClient.ong.findUnique({
        where: { id: article.ongId },
      });

      if (!findOng) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "Ong not found" });
      }

      const newArticle = await this.blogRepository.createArticle(
        article,
        sections
      );
      return res.status(200).json(newArticle);

    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
}

export default BlogService;
