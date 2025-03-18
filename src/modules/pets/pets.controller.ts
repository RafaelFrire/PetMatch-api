import { Request, Response } from "express";

import ErrorCode from "../../constants/errorCode";
import PetsService from "./pets.service";

class PetsController {
  petsService: PetsService = new PetsService();

  async getPetById(req: Request, res: Response) {
    try {
      const event = await this.petsService.getPetById(req, res);
      return event;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async getPetBySlug(req: Request, res: Response) {
    try {
      const event = await this.petsService.getPetBySlug(req, res);
      return event;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async getPets(req: Request, res: Response) {
    try {
      const events = await this.petsService.getAllPets(req, res);
      return events;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async createPet(req: Request, res: Response, filenames: string[]) {
    try {
      console.log(req.body);
      const event = await this.petsService.createPet(req, res, filenames);
      return event;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }
}

export default PetsController;