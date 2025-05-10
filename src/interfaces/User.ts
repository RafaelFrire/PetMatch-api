import RoleEnum from "../enums/RoleEnum";
import StatusEnum from "../enums/StatusEnum";


export interface CreateUserInput {
  id: string;
  email: string;
  password: string;
  name: string;
  lastname: string | null;
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
  documentPath: string | null;
  password_reset_token: string | null;
  password_reset_experies: Date | null;  // Corrigido o nome para `password_reset_expires`
  status: StatusEnum;
  ong?: Ong;
  adopter?: Adopter;
}


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
  password_reset_token: string | null;
  password_reset_experies: Date | null;
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


enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

enum ResidenceType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  OTHER = "OTHER",
}
export interface ExtendedUser extends User {
  maritalStatus?: MaritalStatus;
  proofOfResidence?: string;
  residenceType?: ResidenceType;
  hasOtherPets?: boolean;
  reasonForAdoption?: string;
}