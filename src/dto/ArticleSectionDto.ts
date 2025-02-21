class ArticleSectionDto {
  title: string;
  content: string;
  image: string;
  quote: string;
  articleId: number;

  constructor(
    title: string,
    content: string,
    articleId: number,
    image: string,
    quote: string
  ) {
    this.title = title;
    this.content = content;
    this.articleId = articleId;
    this.image = image;
    this.quote = quote;
  }
}


export default ArticleSectionDto;