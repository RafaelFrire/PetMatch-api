class ArticleDto {
  title: string;
  slug: string;
  categorie: string;
  thumbnail: string;
  content: string;
  ongId: string;

  constructor(
    title: string,
    slug: string,
    categorie: string,
    thumbnail: string,
    content: string,
    ongId: string
  ) {
    this.title = title;
    this.slug = slug;
    this.categorie = categorie;
    this.content = content;
    this.thumbnail = thumbnail;
    this.ongId = ongId;
  }
}

export default ArticleDto;
