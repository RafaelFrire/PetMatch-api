class ArticleSectionDto {
  title: string;
  content: string;
  image: string;
  quoto: string;
  articleId: number;

  constructor(
    title: string,
    content: string,
    articleId: number,
    image: string,
    quoto: string
  ) {
    this.title = title;
    this.content = content;
    this.articleId = articleId;
    this.image = image;
    this.quoto = quoto;
  }
}


export default ArticleSectionDto;