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

router.get("/api/event/:id/id", (req: Request, res: Response) => {
  eventController.getEventById(req, res);
});

router.patch("/api/event/:id/id", upload, (req: Request, res: Response) => {
  eventController.updateEventById(req, res);
});

router.delete("/api/events/:id/id", (req: Request, res: Response) => {
  eventController.deleteEventById(req, res);
});

router.post(
  "/api/events/create",
  // ValidateJwt,
  upload,
  (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]; // Garantimos que é um array
    const filename = files.length > 0 ? files[0].filename : "";
    eventController.createEvent(req, res, filename);
  }
);

export default router;
