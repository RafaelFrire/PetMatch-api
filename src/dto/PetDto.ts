class PetDto {
    id?: string;
    name: string;
    species: string;
    breed: string;
    color: string;
    size: string;
    health: string;
    temperament: string;
    birthdate: Date;
    status: boolean;
    history: string;
    slug: string;
    ongId: string;
  
    constructor(
      id: string,
      name: string,
      species: string,
      breed: string,
      color: string,
      size: string,
      health: string,
      temperament: string,
      birthdate: Date,
      status: boolean,
      history: string,
      slug: string,
      ongId: string
    ) {
      this.id = id;
      this.name = name;
      this.species = species;
      this.breed = breed;
      this.color = color;
      this.size = size;
      this.health = health;
      this.temperament = temperament;
      this.birthdate = birthdate;
      this.status = status;
      this.history = history;
      this.slug = slug;
      this.ongId = ongId;
    }
  }
  