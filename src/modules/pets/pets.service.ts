import { Request, Response } from "express";
import PetsRepository from "./pets.repository";
import ErrorCode from "../../constants/errorCode";
import { ErrorMessage } from "../../constants/errorMessage";
import prismaClient from "../../database";

class PetsService {
  petRepository: PetsRepository = new PetsRepository();

  async getPetById(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(ErrorCode.BAD_REQUEST).json({ message: "Invalid id" });
    }
    try {
      const pet = await this.petRepository.getPetById(id);
      if (!pet) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "Pet not found" });
      }
      return pet;
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getPetBySlug(req: Request, res: Response) {
    const slug = req.params.slug;

    if (!slug) {
      return res
        .status(ErrorCode.BAD_REQUEST)
        .json({ message: "Invalid slug" });
    }

    try {
      const pet = await this.petRepository.getPetBySlug(slug);

      if (pet === null) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "Pet not found" });
      }
      return res.status(200).json(pet);
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getPetsByOngSlug(req: Request, res: Response) {
    const slug = req.params.slug;

    if (!slug) {
      return res
        .status(ErrorCode.BAD_REQUEST)
        .json({ message: "Invalid slug" });
    }

    try {
      const pet = await this.petRepository.getPetsByOngSlug(slug);

      if (pet === null) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "Pet not found" });
      }
      return res.status(200).json(pet);
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getAllPets(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || (1 as number);
      const limit = Number(req.query.limit) || (20 as number);

      const petFilters: any = {}; // Filtros do PET
      const ongFilters: any = {}; // Filtros da ONG

      // Filtros do PET
      if (req.query.especie) petFilters.species = req.query.especie;
      if (req.query.raca) petFilters.breed = req.query.raca;
      if (req.query.porte) petFilters.size = req.query.porte;
      if (req.query.saude) petFilters.health = req.query.saude;
  
      // Filtros da ONG (localização)
      if (req.query.estado) ongFilters.state = req.query.estado;
      if (req.query.cidade) ongFilters.city = req.query.cidade;

      const { pets, totalPages } = await this.petRepository.getAllPets(
        page,
        limit,
        petFilters,
        ongFilters
      );

      return res.status(200).json({ pets, page, limit, totalPages });
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async createPet(req: Request, res: Response, filenames: string[]) {
    const pet: PetDto = req.body;

    const requiredFields = [
      "name",
      "species",
      "breed",
      "color",
      "size",
      "health",
      "temperament",
      "birthdate",
      "history",
      "slug",
      "ongId",
    ];

    for (const field of requiredFields) {
      if (!(field in pet)) {
        return res
          .status(ErrorCode.BAD_REQUEST)
          .json({ message: `${field} is required` });
      }
    }

    try {
      const findOng = await prismaClient.ong.findUnique({
        where: { id: pet.ongId },
      });

      if (!findOng) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "Ong not found" });
      }

      const newPet = await this.petRepository.createPet({ ...pet }, filenames);
      return res.status(201).json(newPet);
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
}

export default PetsService;