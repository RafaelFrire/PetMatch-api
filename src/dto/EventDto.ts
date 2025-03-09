class EventDto {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    slug: string;
    categorie: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    ongId: string;

    constructor(
        id: string, 
        title: string, 
        description: string, 
        imageUrl: string, 
        slug: string, 
        categorie: string, 
        date: Date, 
        createdAt: Date, 
        updatedAt: Date, 
        ongId: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.slug = slug;
        this.categorie = categorie;
        this.date = date;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.ongId = ongId;
    }
}