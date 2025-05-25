import { Request, Response } from "express";
import ErrorCode from "../../constants/errorCode";
import { ErrorMessage } from "../../constants/errorMessage";
import EventRepository from "./event.repository";
import prismaClient from "../../database";


class EventService {
  eventRepository: EventRepository = new EventRepository();

  async getEventById(req: Request, res: Response) {
    const id = req.params.id;
    console.log("getEventById called with id:", id);

    if (!id) {
      console.warn("Invalid id provided");
      return res.status(ErrorCode.BAD_REQUEST).json({ message: "Invalid id" });
    }

    try {
      console.log("Fetching event with id:", id);
      const event = await this.eventRepository.getEventById(id);

      if (!event) {
        console.warn("Event not found for id:", id);
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "event not found" });
      }

      console.log("Event fetched successfully:", event);
      return res.status(200).json(event);

    } catch (err) {
      console.error("Database error while fetching event by id:", err);
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
      const event = await this.eventRepository.getEventBySlug(slug);

      if (event === null) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "event not found" });
      }
      return res.status(200).json(event);
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getEvents(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || (1 as number);
      const limit = Number(req.query.limit) || (20 as number);
      const categorie = req.query.categorie as string;

      const { events, totalPages } = await this.eventRepository.getEvents(
        page,
        limit,
        categorie
      );

      return res.status(200).json({ events, page, limit, totalPages });
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async createEvent(req: Request, res: Response, filename?: string) {
    const event: EventDto = req.body;

    const requiredFields = [
      "title",
      "slug",
      "categorie",
      "time",
      "location",
      "address",
      "city",
      "state",
      "description",
      "additionalInfo",
      "date",
      "ongId",
    ];
    
    // Verificar dinamicamente se algum campo obrigatório está ausente
    for (const field of requiredFields) {
      if (!(field in event)) {  // Aqui estamos usando 'in' para garantir que a chave exista
        return res
          .status(ErrorCode.BAD_REQUEST)
          .json({ message: `${field} is required` });
      }
    }
    
    try {
      const findOng = await prismaClient.ong.findUnique({
        where: { userId: event.ongId },
      });

      if (!findOng) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "Ong not found" });
      }

      const newEvent = await this.eventRepository.createEvent({
        id: event.id,
        title: event.title,
        slug: event.slug,
        categorie: event.categorie,
        time: event.time,
        location: event.location,
        address: event.address,
        city: event.city,
        state: event.state,
        description: event.description,
        additionalInfo: event.additionalInfo,
        date: new Date(event.date),
        ongId: findOng.id,
        imageUrl: filename || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return res.status(201).json(newEvent);
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
  
  async updateEventById(req: Request, res: Response) {
    const id = req.params.id;
    const updates = req.body;

    const { organizer, ...safeUpdates } = updates;

    if (!id) {
      return res.status(ErrorCode.BAD_REQUEST).json({ message: "Invalid id" });
    }

    try {
      const event = await this.eventRepository.getEventById(id);

      const findOng = await prismaClient.ong.findUnique({
        where: { userId: updates.ongId },
      });

      if (!event) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "event not found" });
      }

      const updatedEvent = await this.eventRepository.updateEvent(id, {
        ...safeUpdates,
        date: new Date(updates.date),
        ongId: findOng?.id,
      });

      return res.status(200).json(updatedEvent);
    } catch (err) {
      console.error("Database error while updating event:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
  async deleteEventById(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(ErrorCode.BAD_REQUEST).json({ message: "Invalid id" });
    }
    try {
      const event = await this.eventRepository.getEventById(id);
      if (!event) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "event not found" });
      }

      await this.eventRepository.destroy(id);
      return res.status(200).json({ message: "event deleted" });
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
}

export default EventService;