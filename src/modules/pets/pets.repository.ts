import { Pet } from ".prisma/client";
import prismaClient from "../../database";
class PetsRepository {
  async createPet(pet: PetDto, filenames: string[]) {
    const newPetRecord = await prismaClient.pet.create({
      data: { ...pet },
    });

    const newImagesRecord = await prismaClient.petImage.createMany({
      data: filenames.map((filename) => ({
        url: filename,
        petId: newPetRecord.id,
      })),
    });

    return newPetRecord;
  }

  async getPetBySlug(slug: string): Promise<{ pet: Pet, images: string[] }> {
    const findPet = await prismaClient.pet.findUnique({
      where: { slug },
    });

    const findImages = await prismaClient.petImage.findMany({
      where: {
        petId: findPet?.id,
      },
    });
    if (!findPet) {
      throw new Error('Pet not found');
    }
    return {
      pet: findPet,
      images: findImages.map((image) => image.url)
    };
  }

  async getPetById(id: string) {
    return await prismaClient.pet.findUnique({
      where: { id },
    });
  }

  async updatePet(id: string, pet: PetDto) {
    return await prismaClient.pet.update({
      where: { id },
      data: { ...pet },
    });
  }

  async deletePet(id: string) {
    return await prismaClient.pet.delete({
      where: { id },
    });
  }

  async getAllPets(
    page: number,
    limit: number,
    petFilters?: any,
    ongFilters?: any
  ) {
    const [pets, totalPets] = await Promise.all([
      prismaClient.pet.findMany({
        where: {
          ...petFilters,
          ong: {
            is: { ...ongFilters },
          },
        },
        include: {
          images: {
            select: {
              url: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prismaClient.article.count(),
    ]);

    const totalPages = Math.ceil(totalPets / limit);

    return {
      pets,
      totalPages,
    };
  }
}

export default PetsRepository;