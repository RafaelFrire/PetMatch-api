class EventDto {
  id: string;
  title: string;
  slug: string;
  categorie: string;
  time: string;
  location: string;
  address: string;
  city: string;
  state: string;
  description: string;
  additionalInfo: string;
  imageUrl: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  ongId: string;
  userId?: string;

  constructor(
    id: string,
    title: string,
    slug: string,
    categorie: string,
    time: string,
    location: string,
    address: string,
    city: string,
    state: string,
    description: string,
    additionalInfo: string,
    imageUrl: string,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    ongId: string,
    userId: string
  ) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.categorie = categorie;
    this.time = time;
    this.location = location;
    this.address = address;
    this.city = city;
    this.state = state;
    this.description = description;
    this.additionalInfo = additionalInfo;
    this.imageUrl = imageUrl;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.ongId = ongId;
    this.userId = userId;
  }
}
