import { Request, Response } from "express";
import ErrorCode from "../../constants/errorCode";
import { ErrorMessage } from "../../constants/errorMessage";
import EventRepository from "./event.repository";
import prismaClient from "../../database";


class EventService{
    eventRepository:EventRepository = new EventRepository();

    async getEventById(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
          return res.status(ErrorCode.BAD_REQUEST).json({ message: "Invalid id" });
        }
        try {
          const article = await this.eventRepository.getEventById(id);
          if (!article) {
            return res
              .status(ErrorCode.NOT_FOUND)
              .json({ message: "Article not found" });
          }
          return article;
        } catch (err) {
          console.error("Database error:", err);
          return res
            .status(ErrorCode.INTERNAL_EXCEPTION)
            .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
        }
      }
    
      async getEventBySlug(req: Request, res: Response) {
        const slug = req.params.slug;
    
        if (!slug) {
          return res
            .status(ErrorCode.BAD_REQUEST)
            .json({ message: "Invalid slug" });
        }
    
        try {
          const article = await this.eventRepository.getEventBySlug(slug);
    
          if (article === null) {
            return res
              .status(ErrorCode.NOT_FOUND)
              .json({ message: "Article not found" });
          }
          return res.status(200).json(article);
        } catch (err) {
          console.error("Database error:", err);
          return res
            .status(ErrorCode.INTERNAL_EXCEPTION)
            .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
        }
      }
    
      async getEvents(req: Request, res: Response) {
        try {
          const page = Number(req.query.page) || 1 as number;
          const limit = Number(req.query.limit) || 20 as number;
          const categorie = req.query.categorie as string;
    
    
          const { articles, totalPages } = await this.eventRepository.getEvents(
            page,
            limit,
            categorie
          );
          
          return res.status(200).json({ articles, page, limit, totalPages });
        } catch (err) {
          console.error("Database error:", err);
          return res
            .status(ErrorCode.INTERNAL_EXCEPTION)
            .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
        }
      }
    
      async createEvent(req: Request, res: Response) {
        const event = req.body.event as EventDto;
    
        console.log("event", event);
    
    
        if (!event) {
          return res
            .status(ErrorCode.BAD_REQUEST)
            .json({ message: "Invalid data" });
        }
        try {
          const findOng = await prismaClient.event.findUnique({
            where: { id: event.ongId },
          });
    
          if (!findOng) {
            return res
              .status(ErrorCode.NOT_FOUND)
              .json({ message: "Ong not found" });
          }
    
          const newEvent = await this.eventRepository.createEvent(event);
          return res.status(200).json(newEvent);
    
        } catch (err) {
          console.error("Database error:", err);
          return res
            .status(ErrorCode.INTERNAL_EXCEPTION)
            .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
        }
      }
}

export default EventService;