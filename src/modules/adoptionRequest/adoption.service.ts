import { ExtendedUser } from "./../../interfaces/User";
import { AdoptionRequest } from "./../../../node_modules/.prisma/client/index.d";
import { Request, Response } from "express";
import AdoptionRepository from "./adoption.repository";
import PetsRepository from "../pets/pets.repository";
import { User } from "../../interfaces/User";
import prismaClient from "../../database";

class AdoptionService {
  adoptionRepository: AdoptionRepository = new AdoptionRepository();
  petsRepository: PetsRepository = new PetsRepository();

  async createAdoptionRequest(req: Request, res: Response) {
    try {
      const { petId, adopterId } = req.params;
      const data: ExtendedUser = req.body;

      console.log("petid", petId)
      console.log("adopterId", adopterId)

      if(!petId || !adopterId) {
        return res.status(400).json({ error: "Pet ID and Adopter ID are required" });
      }

      const findPet = await this.petsRepository.getPetById(petId);

      const findAdoper = await prismaClient.adopter.findUnique({
        where: {
          userId: adopterId,
        },
      });

      if (findPet === null) {
        return res.status(404).json({ error: "Pet not found" });
      }
      if (findAdoper === null) {
        return res.status(404).json({ error: "Adoper not found" });
      }

      const formatAdoptionData: AdoptionRequest = {
        petId: petId,
        adopterId: adopterId,
        id: data.id,
        name: data.name,
        status: data.status,
        createdAt: new Date(),
        phone: data?.adopter?.phone || "",
        address: data.adopter?.address || "",
        state: data.adopter?.state || "",
        city: data.adopter?.city || "",
        email: data.email || "",
        cpf: data.adopter?.document || "",
        maritalStatus: data?.maritalStatus || "SINGLE",
        proofOfResidence: data?.proofOfResidence || "",
        zipCode: data.adopter?.zipcode || "",
        residenceType: data?.residenceType || "HOUSE",
        hasOtherPets: data?.hasOtherPets || false,
        reasonForAdoption: data?.reasonForAdoption || "",
      };

      const newAdoption = await this.adoptionRepository.createAdoptionRequest(
        petId,
        adopterId,
        formatAdoptionData
      );
      return res.status(201).json(newAdoption);
    } catch (err) {
        console.log("Error creating adoption request", err);
      return res
        .status(500)
        .json({ error: "Error creating adoption request", err });
    }
  }

  async getAllAdoptionsByOngId(req: Request, res: Response) {
    try {
      const { petId, adopterId } = req.params;
      const data: User = req.body;

      const findPet = await this.adoptionRepository.getAllAdoptionsByOngId(
        petId
      );
    } catch (err) {
      return res.status(500).json({ error: "Error creating adoption request" });
    }
  }

  async getSucessRequest(req: Request, res: Response) {
    try {
      const { petId, adopterId } = req.params;
      const data: User = req.body;

      const findPet = await this.adoptionRepository.getSucessRequest(petId);
    } catch (err) {
      return res.status(500).json({ error: "Error creating adoption request" });
    }
  }

  async getPendencesRequest(req: Request, res: Response) {
    try {
      const { petId, adopterId } = req.params;
      const data: User = req.body;

      const findPet = await this.adoptionRepository.getPendencesRequest(petId);
    } catch (err) {
      return res.status(500).json({ error: "Error creating adoption request" });
    }
  }

  async getAdoptionById(req: Request, res: Response) {
    try {
      const { petId, adopterId } = req.params;
      const data: User = req.body;

      const findPet = await this.petsRepository.getPetById(petId);
    } catch (err) {
      return res.status(500).json({ error: "Error creating adoption request" });
    }
  }
}

export default AdoptionService;
