import { Router, Request, Response } from "express";
import MessageController from "./message.controller";


const router = Router()

const messageController:MessageController = new MessageController()


router.get("/api/messages/:chatId", (req: Request, res: Response) => {
  messageController.getMessages(req, res);
});

router.get("/api/messages/chats/user/:userId", (req: Request, res: Response) => {
  messageController.getChatsByUserId(req, res);
});

export default router;