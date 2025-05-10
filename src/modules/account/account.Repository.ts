import { user } from '@prisma/client';
import prismaClient from "../../database";

class AccountRepository {
  async findById(id: string):Promise<user | null> {
    return prismaClient.user.findUnique({
      where: { id },
      include: {
        ong: true,
        adopter: true,
      },
    });
  }


}

export default AccountRepository;
