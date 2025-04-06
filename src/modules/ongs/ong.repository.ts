import { ong } from ".prisma/client";
import prismaClient from "../../database";

class OngRepository {
  async createOng(ong: OngDto, filenames: string[]) {
    const newOngRecord = await prismaClient.ong.create({
      data: { ...ong },
    });

    // const newImagesRecord = await prismaClient.petImage.createMany({
    //   data: filenames.map((filename) => ({
    //     url: filename,
    //     petId: newOngRecord.id,
    //   })),
    // });

    return newOngRecord;
  }

  async getOngBySlug(
    slug: string
  ): Promise<{ ong: ong | null; images: string[] }> {
    const findOng = await prismaClient.ong.findFirst({
      where: { slug },
    });

    // const findImages = await prismaClient.petImage.findMany({
    //   where: {
    //     petId: findOng?.id,
    //   },
    // });

    if (!findOng) {
      return {
        ong: null,
        images: [],
      };
    }
    return {
      ong: findOng,
      images: [],
      //   images: findImages.map((image) => image.url)
    };
  }

  async getOngById(id: string) {
    return await prismaClient.ong.findUnique({
      where: { id },
    });
  }

  async updateOng(id: string, ong: OngDto) {
    return await prismaClient.ong.update({
      where: { id },
      data: { ...ong },
    });
  }

  async deleteOng(id: string) {
    return await prismaClient.pet.delete({
      where: { id },
    });
  }

  async getAllOngs(page: number, limit: number, ongFilters?: any) {
    const [ong, totalOngs] = await Promise.all([
      prismaClient.ong.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),

      prismaClient.ong.count(),
    ]);

    const totalPages = Math.ceil(totalOngs / limit);

    return {
      ong,
      totalPages,
    };
  }
}

export default OngRepository;