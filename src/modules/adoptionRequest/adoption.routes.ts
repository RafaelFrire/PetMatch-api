
import { Request, Response, Router } from "express";
import ValidateJwt from "../../middleware/ValidateToken";
import upload from "../../config/multerConfig";
import AdoptionController from "./adoption.Controller";

const router = Router();

const adoptionController: AdoptionController = new AdoptionController();

router.get("/api/account/:id", (req: Request, res: Response) => {
    adoptionController.createAdoptionRequest(req, res);
});



export default router;