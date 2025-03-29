import { Request, Response } from "express";
import ErrorCode from "../../constants/errorCode";
import OngService from "./ong.service";

class OngController {
  ongService: OngService = new OngService();

  async getOngById(req: Request, res: Response) {
    try {
      const ong = await this.ongService.getOngById(req, res);
      return ong;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async getOngBySlug(req: Request, res: Response) {
    try {
      const ong = await this.ongService.getOngBySlug(req, res);
      return ong;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async getOngs(req: Request, res: Response) {
    try {
      const pets = await this.ongService.getAllOngs(req, res);
      return pets;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }

  async createOng(req: Request, res: Response, filenames: string[]) {
    try {
      const pet = await this.ongService.createOng(req, res, filenames);
      return pet;
    } catch (error) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (error as Error).message });
    }
  }
}

export default OngController;
