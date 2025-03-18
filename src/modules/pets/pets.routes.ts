import { Router, Request, Response } from "express";
import ValidateJwt from "../../middleware/ValidateToken";
import upload from "../../config/multerConfig";
import PetsController from "./pets.controller";

const petsController: PetsController = new PetsController();

const router = Router();


router.get("/api/pets", (req: Request, res: Response) => {
    petsController.getPets(req, res);
  });
  
  router.get("/api/event/:slug/slug", (req: Request, res: Response) => {
    petsController.getPetBySlug(req, res);
  });
  
  router.get("/api/pets/:id/id", (req: Request, res: Response) => {
    petsController.getPetById(req, res);
  });
  
  router.post(
    "/api/pets/create",
    ValidateJwt,
    upload,
    (req: Request, res: Response) => {
      const files = req.files as Express.Multer.File[]; // Garantimos que é um array
      const filenames = files.map((file) => file.filename);
      console.log(filenames);
      petsController.createPet(req, res, filenames);
    }
  );
  
  export default router;
  