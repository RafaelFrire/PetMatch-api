class ArticleDto {
  title: string;
  slug: string;
  categorie: string;
  thumbnail: string;
  ongId: string;

  constructor(
    title: string,
    slug: string,
    categorie: string,
    thumbnail: string,
    ongId: string
  ) {
    this.title = title;
    this.slug = slug;
    this.categorie = categorie;
    this.thumbnail = thumbnail;
    this.ongId = ongId;
  }
}

export default ArticleDto;
