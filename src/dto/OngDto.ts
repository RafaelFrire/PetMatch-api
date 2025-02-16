class OngDto {
  name: string;
  slug: string;
  cnpj: string;
  phone: string;
  address: string;
  zipcode: string;
  state: string;
  city: string;
  userId: string;

  constructor(
    name: string,
    slug: string,
    cnpj: string,
    phone: string,
    address: string,
    zipcode: string,
    state: string,
    city: string,
    userId: string
  ) {
    this.name = name;
    this.slug = slug;
    this.cnpj = cnpj;
    this.phone = phone;
    this.address = address;
    this.zipcode = zipcode;
    this.state = state;
    this.city = city;
    this.userId = userId;
  }
}
