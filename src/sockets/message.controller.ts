import { Request, Response, response } from "express";
import ErrorCode from "../constants/errorCode";
import MessageService from "./message.service";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  subject: string;
  message: string;
}

class MessageController {
  messageService: MessageService = new MessageService();
  async getChatsByUserId(req: Request, res: Response) {
    try {
      const chat = this.messageService.getChatsByUserId(req, res);
      return chat;
    } catch (err) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (err as Error).message });
    }
  }

  async getMessages(req: Request, res: Response) {
    try {
      const messages = this.messageService.getMessages(req, res);
      return messages;
    } catch (err) {
      res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: (err as Error).message });
    }
  }
}

export default MessageController;
