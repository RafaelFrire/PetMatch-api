import { Article } from "@prisma/client";
import prismaClient from "../../database";
import ArticleDto from "../../dto/ArticleDto";
import ArticleSectionDto from "../../dto/ArticleSectionDto";

class BlogRepository {
  async createArticle(article: ArticleDto, sections: ArticleSectionDto[]) {
    return await prismaClient.article.create({
      data: {
        title: article.title,
        slug: article.slug, // slug UNIQUE
        categorie: article.categorie,
        thumbnail: article.thumbnail,
        ongId: article.ongId,
        sections: {
          createMany: {
            data: sections.map((section) => {
              return {
                title: section.title,
                content: section.content,
                image: section.image,
                quote: section.quote,
              };
            }),
          },
        },
      },
    });
  }

  async getArticleById(id: string) {
    return await prismaClient.article.findUnique({
      where: { id },
    });
  }

  async getArticleBySlug(slug: string) {
    return await prismaClient.article.findFirst({
      where: { slug },
      include: {
        sections: true,
      },
    });
  }
  async getArticles(page: number, limit: number) {
    return await prismaClient.article.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        sections: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default BlogRepository;
