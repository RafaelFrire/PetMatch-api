import { Router, Request, Response } from "express";
import ValidateJwt from "../../middleware/ValidateToken";
import EventController from "./event.controller";

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
  ValidateJwt,
  (req: Request, res: Response) => {
    eventController.createEvent(req, res);
  }
);

export default router;
