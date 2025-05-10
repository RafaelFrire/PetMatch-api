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

  async getAllAdoptionsByOngId(ongId: string) {
    const allAdoptions = await prismaClient.adoptionRequest.findMany({
      where: {
        pet: {
          ongId,
        },
      },
    });
    return allAdoptions;
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
    const deletedAdoption = await prismaClient.adoptionRequest.findUnique({
      where: {
        id,
      },
    });
    return deletedAdoption;
  }

  async updateAdoptionRequest(id: string, status: string) {
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
