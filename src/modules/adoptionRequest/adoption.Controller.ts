import { Request, Response } from "express";
import AdoptionService from "./adoption.service";

class AdoptionController {
  adoptionService: AdoptionService = new AdoptionService();
  async createAdoptionRequest(req: Request, res: Response) {
    try {
      const adoption = this.adoptionService.createAdoptionRequest(req, res);
      return adoption;
    } catch (err) {
      return res.status(500).json({ error: "Error creating adoption request" });
    }
  }
}

export default AdoptionController;
