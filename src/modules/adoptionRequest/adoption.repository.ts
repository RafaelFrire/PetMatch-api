import { AdoptionRequest } from "@prisma/client";
import prismaClient from "../../database";
class AdoptionRepository {
  async createAdoptionRequest(
    petId: string,
    adopterId: string,
    data: AdoptionRequest
  ) {
    const adoption = await prismaClient.adoptionRequest.create({
      data: {
        ...data,
        id: undefined,
        petId,
        adopterId,
      },
    });
    return adoption;
  }

  async getAdoptionRequestsByUserId(adopterId: string) {
    const adoptionRequests = await prismaClient.adoptionRequest.findMany({
      where: {
        adopterId,
      },
    });
    return adoptionRequests;
  }

  async getAdoptionRequestsByPetId(petId: string) {
    const adoptionRequests = await prismaClient.adoptionRequest.findMany({
      where: {
        petId,
      },
    });
    return adoptionRequests;
  }

  async getAllAdoptions() {
    const allAdoptions = await prismaClient.adoptionRequest.findMany();
    return allAdoptions;
  }

  async getAllAdoptionsByOngId(ongId: string, page: number, limit: number) {
    const [adoptions, totalAdoptions, totalApproveds, totalRejected, totalPending] =
      await Promise.all([
        prismaClient.adoptionRequest.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            pet: {
              ongId,
            },
          },
          include: {
            pet: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        prismaClient.adoptionRequest.count({
          where: {
            pet: {
              ongId,
            },
          },
        }),

        prismaClient.adoptionRequest.count({
          where: {
            pet: {
              ongId,
            },
            status: "APPROVED",
          },
        }),

        prismaClient.adoptionRequest.count({
          where: {
            pet: {
              ongId,
            },
            status: "REJECTED",
          },
        }),

             prismaClient.adoptionRequest.count({
          where: {
            pet: {
              ongId,
            },
            status: "PENDING",
          },
        }),
      ]);

    const totalPages = Math.ceil(totalAdoptions / limit);

    return {
      adoptions,
      totalPages,
      totalItems: totalAdoptions,
      totalAprovado: totalApproveds,
      totalReprovado: totalRejected,
      totalPendente: totalPending,
    };
  }

  async getPendencesRequest(ongId: string) {
    const allAdoptions = await prismaClient.adoptionRequest.findMany({
      where: {
        state: "PENDING",
        pet: {
          ongId,
        },
      },
    });
    return allAdoptions;
  }

  async getSucessRequest(ongId: string) {
    const allAdoptions = await prismaClient.adoptionRequest.findMany({
      where: {
        state: "SUCCESS",
        pet: {
          ongId,
        },
      },
    });
    return allAdoptions;
  }

  async getAdoptionById(id: string) {
    const adoption = await prismaClient.adoptionRequest.findUnique({
      where: {
        id,
      },
    });
    return adoption;
  }

  async deleteAdoptionRequest(id: string) {
    const deletedAdoption = await prismaClient.adoptionRequest.delete({
      where: {
        id,
      },
    });
    return deletedAdoption;
  }

  async setAdoptionStatus(id: string, status: string) {
    const updatedAdoption = await prismaClient.adoptionRequest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return updatedAdoption;
  }
}

export default AdoptionRepository;
