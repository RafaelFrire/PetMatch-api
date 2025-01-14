import RoleEnum from "../enums/RoleEnum";
import StatusEnum from "../enums/StatusEnum";

export interface User {
  id: string;
  email: string;
  name: string;
  lastname?: string;
  role: RoleEnum;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  documentPath?: string;
  password_reset_token?: string;
  password_reset_expires?: Date;
  status: StatusEnum;
  ong?: Ong;
  adopter?: Adopter;
}

export interface Adopter {
  id: string;
  document: string;
  phone: string;
  address: string;
  zipcode: string;
  state: string;
  city: string;
  userId: string;
  user: User;
}

export interface Ong {
  id: string;
  cnpj: string;
  phone: string;
  address: string;
  zipcode: string;
  state: string;
  city: string;
  userId: string;
  user: User;
}
