import { Router, Request, Response } from "express";
import ValidateJwt from "../../middleware/ValidateToken";
import upload from "../../config/multerConfig";
import OngController from "./ong.controller";

const router = Router();

const ongController: OngController = new OngController();

router.get("/api/ongs", (req: Request, res: Response) => {
  ongController.getOngs(req, res);
});

router.get("/api/ong/:slug/slug", (req: Request, res: Response) => {
  ongController.getOngBySlug(req, res);
});

router.get("/api/ong/:id/id", (req: Request, res: Response) => {
  ongController.getOngById(req, res);
});

router.post(
  "/api/ongs/create",
  ValidateJwt,
  upload,
  (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]; // Garantimos que é um array
    const filenames = files.map((file) => file.filename);
    console.log(filenames);
    ongController.createOng(req, res, filenames);
  }
);

export default router;
