import { article } from "@prisma/client";
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
        banner: article.banner,
        thumbnail: article.thumbnail,
        ongId: article.ongId,
        updatedAt: new Date(),
        section: {
          createMany: {
            data: sections.map((section) => {
              return {
                title: section.title,
                content: section.content,
                image: section.image,
                quote: section.quote,
                position: section.position,
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
        section: {
          orderBy: {
            position: "asc",
          },
        },
        ong: {},
      },
    });
  }
  async getArticles(page: number, limit: number, categorie?: string) {
    const [articles, totalArticles] = await Promise.all([
      prismaClient.article.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          categorie,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prismaClient.article.count(),
    ]);

    const totalPages = Math.ceil(totalArticles / limit);

    return {
      articles,
      totalPages,
    };
  }
}

export default BlogRepository;
