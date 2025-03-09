class ArticleSectionDto {
  title: string;
  content: string;
  image: string;
  quote: string;
  articleId: number;
  position: number;

  constructor(
    title: string,
    content: string,
    articleId: number,
    position: number,
    image: string,
    quote: string
  ) {
    this.title = title;
    this.content = content;
    this.articleId = articleId;
    this.position  = position;
    this.image = image;
    this.quote = quote;
  }
}


export default ArticleSectionDto;