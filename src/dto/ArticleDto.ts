class ArticleDto {
  title: string;
  categorie: string;
  thumbnail: string;
  ongId: string;

  constructor(
    title: string,
    categorie: string,
    thumbnail: string,
    ongId: string
  ) {
    this.title = title;
    this.categorie = categorie;
    this.thumbnail = thumbnail;
    this.ongId = ongId;
  }
}

export default ArticleDto;
