import { User } from "@prisma/client";
import prismaClient from "../database";

class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prismaClient.user.findFirst({ where: { email } });
  }
  async createUser(data: User): Promise<User> {
    return prismaClient.user.create({ data });
  }
}

export default AuthRepository;