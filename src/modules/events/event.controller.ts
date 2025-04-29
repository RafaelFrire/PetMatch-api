import { Request, Response } from "express";
import ErrorCode from "../../constants/errorCode";
import EventService from "./event.service";


class EventController{
    eventService: EventService = new EventService();

    async getEventById(req: Request, res: Response) {
      try {
        const event = await this.eventService.getEventById(req, res);
        return event;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
  
    async getEventBySlug(req: Request, res: Response) {
      try {
        const event = await this.eventService.getEventBySlug(req, res);
        return event;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
  
    async getEvents(req: Request, res: Response) {
      try {
        const events = await this.eventService.getEvents(req, res);
        return events;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
    async updateEventById(req: Request, res: Response) {
      try {
        const updatedEvent = await this.eventService.updateEventById(req, res);
        return updatedEvent;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
  
    async createEvent(req: Request, res: Response, filename?:string) {
      try {
        const event = await this.eventService.createEvent(req, res, filename);
        return event;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }

    async deleteEventById(req: Request, res: Response) {
      try {
        const event = await this.eventService.deleteEventById(req, res);
        return event;
      } catch (error) {
        res
          .status(ErrorCode.INTERNAL_EXCEPTION)
          .json({ message: (error as Error).message });
      }
    }
}

export default EventController;