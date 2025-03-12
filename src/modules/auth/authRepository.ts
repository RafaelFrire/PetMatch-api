import { user } from "@prisma/client";
import prismaClient from "../../database";

class AuthRepository {
  async findByEmail(email: string): Promise<user | null> {
    return prismaClient.user.findFirst({ where: { email } });
  }
  async createUser(data: user): Promise<user> {
    return prismaClient.user.create({
      data: {
        ...data,
      },
    });
  }

  async createAdopter(data: user, adopter: AdotperDto): Promise<user> {
    return prismaClient.user.create({
      data: {
        ...data,
        adopter: {
          create: {
            document: adopter.document,
            phone: adopter.phone,
            address: adopter.address,
            zipcode: adopter.zipcode,
            state: adopter.state,
            city: adopter.city,
            
          },
        },
      },
    });
  }

  async createOng(data: user, ong: OngDto): Promise<user> {
    return prismaClient.user.create({
      data: {
        ...data,
        ong: {
          create: {
            name: ong.name,
            slug: ong.slug,
            cnpj: ong.cnpj,
            phone: ong.phone,
            address: ong.address,
            zipcode: ong.zipcode,
            state: ong.state,
            city: ong.city,
          },
        },
      },
    });
  }
}

export default AuthRepository;
