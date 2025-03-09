import { Router, Request, Response } from "express";
import ValidateJwt from "../../middleware/ValidateToken";
import EventController from "./event.controller";

const eventController:EventController = new EventController();


const router = Router();


router.get("/");


export default router;