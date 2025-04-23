import { Router, Request, Response } from "express";
import ValidateJwt from "../../middleware/ValidateToken";
import EventController from "./event.controller";
import upload from "../../config/multerConfig";

const eventController: EventController = new EventController();

const router = Router();

router.get("/api/events", (req: Request, res: Response) => {
  eventController.getEvents(req, res);
});

router.get("/api/event/:slug/slug", (req: Request, res: Response) => {
  eventController.getEventBySlug(req, res);
});

router.get("/api/events/:id/id", (req: Request, res: Response) => {
  eventController.getEventById(req, res);
});

router.post(
  "/api/events/create",
  // ValidateJwt,
  upload,
  (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]; // Garantimos que é um array
    const filename = files.length > 0 ? files[0].filename : "";
    console.log("body", req.body);
    console.log("files", filename);
    eventController.createEvent(req, res, filename);
  }
);

export default router;
