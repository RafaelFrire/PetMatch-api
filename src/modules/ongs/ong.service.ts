import { Request, Response } from "express";
import ErrorCode from "../../constants/errorCode";
import { ErrorMessage } from "../../constants/errorMessage";
import OngRepository from "./ong.repository";
import prismaClient from "../../database";

class OngService {
  ongRepository: OngRepository = new OngRepository();

  async getOngById(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(ErrorCode.BAD_REQUEST).json({ message: "Invalid id" });
    }
    try {
      const ong = await this.ongRepository.getOngById(id);
      if (!ong) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "ONG not found" });
      }
      return ong;
    } catch (err) {
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getOngBySlug(req: Request, res: Response) {
    const slug = req.params.slug;

    if (!slug) {
      return res
        .status(ErrorCode.BAD_REQUEST)
        .json({ message: "Invalid slug" });
    }

    try {
      const { ong, images } = await this.ongRepository.getOngBySlug(slug);

      if (ong === null) {
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "ONG not found" });
      }
      return res.status(200).json(ong);
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getAllOngs(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || (1 as number);
      const limit = Number(req.query.limit) || (20 as number);

      const petFilters: any = {}; // Filtros do PET
      const ongFilters: any = {}; // Filtros da ONG



      console.log("petFilters", petFilters)
      const { ong, totalPages } = await this.ongRepository.getAllOngs(
        page,
        limit,
        ongFilters
      );

      return res.status(200).json({ ong, page, limit, totalPages });
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async createOng(req: Request, res: Response, filenames: string[]) {
    const ong: OngDto = req.body;

    const requiredFields = [
      "name",
      "slug",
      "cnpj",
      "phone",
      "address",
      "zipcode",
      "state",
      "city",
    ];

    for (const field of requiredFields) {
      if (!(field in ong)) {
        return res
          .status(ErrorCode.BAD_REQUEST)
          .json({ message: `${field} is required` });
      }
    }

    try {
      const newOng = await this.ongRepository.createOng({ ...ong }, filenames);
      return res.status(201).json(newOng);
    } catch (err) {
      console.error("Database error:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
}

export default OngService;
