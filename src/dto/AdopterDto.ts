class AdotperDto {
  document: string;
  phone: string;
  address: string;
  zipcode: string;
  state: string;
  city: string;
  userId: string;

  constructor(
    document: string,
    phone: string,
    address: string,
    zipcode: string,
    state: string,
    city: string,
    userId: string
  ) {
    this.document = document;
    this.phone = phone;
    this.address = address;
    this.zipcode = zipcode;
    this.state = state;
    this.city = city;
    this.userId = userId;
  }
}
