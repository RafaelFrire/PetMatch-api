import { Request, Response } from "express";
import ErrorCode from "../../constants/errorCode";
import EventService from "./event.service";


class EventController{
    eventService: EventService = new EventService();

    async getEventById(req: Request, res: Response) {
      try {
        const article = await this.eventService.getEventById(req, res);
        return article;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
  
    async getEventBySlug(req: Request, res: Response) {
      try {
        const article = await this.eventService.getEventBySlug(req, res);
        return article;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
  
    async getEvents(req: Request, res: Response) {
      try {
        const articles = await this.eventService.getEvents(req, res);
        return articles;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
  
    async createEvent(req: Request, res: Response) {
      try {
        const article = await this.eventService.createEvent(req, res);
        return article;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
}

export default EventController;