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
      const data = req.body;

      console.log("data adaoption", req.body.adopter);
      console.log("data adaoption", req.body);

      if(!petId || !adopterId) {
        return res.status(400).json({ error: "Pet ID and Adopter ID are required" });
      }

      const findPet = await this.petsRepository.getPetById(petId);

      const findAdopter = await prismaClient.adopter.findUnique({
        where: {
          id: adopterId,
        },
      });

      if (findPet === null) {
        return res.status(404).json({ error: "Pet not found" });
      }
      if (findAdopter === null) {
        return res.status(404).json({ error: "Adoper not found" });
      }

      let hasOtherPets = data?.hasOtherPets === true ? true : false;

      const formatAdoptionData: AdoptionRequest = {
        petId: petId,
        adopterId: adopterId,
        id: data.id,
        name: data.name,
        status: data.status || "PENDING",
        createdAt: new Date(),
        phone: data?.phone || "",
        address: data?.address || "",
        state: data?.state || "",
        city: data?.city || "",
        email: data.email || "",
        cpf: data?.document || "",
        maritalStatus: data?.maritalStatus || "SINGLE",
        proofOfResidence: data?.proofOfResidence || "",
        zipCode: data?.zipcode || "",
        residenceType: data?.residenceType || "HOUSE",
        hasOtherPets: hasOtherPets,
        reasonForAdoption: data?.reasonForAdoption || "",
      };

      console.log("formatAdoptionData", formatAdoptionData);

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
