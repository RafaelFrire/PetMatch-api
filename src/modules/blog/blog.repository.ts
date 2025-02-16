import { Article } from "@prisma/client";
import prismaClient from "../../database";
import ArticleDto from "../../dto/ArticleDto";
import ArticleSectionDto from "../../dto/ArticleSectionDto";

class BlogRepository {
  async createArticle(article: ArticleDto, sections: ArticleSectionDto[]) {
    return await prismaClient.article.create({
      data: {
        title: article.title,
        categorie: article.categorie,
        thumbnail: article.thumbnail,
        ongId: article.ongId,
        sections: {
          createMany:{
            data: sections.map((section) => {
              return {
                title: section.title,
                content: section.content,
                image: section.image,
                quoto: section.quoto,
              };
            }),
          }
        },
      },
    });
  }

  async getArticles() {
    return await prismaClient.article.findMany({
      include: {},
    });
  }
}

export default BlogRepository;
