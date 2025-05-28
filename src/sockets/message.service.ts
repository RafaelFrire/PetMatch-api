import { Request, Response } from "express";
import prismaClient from "../database";
import MessageRepository from "./messageRepository";
import ErrorCode from "../constants/errorCode";
import { ErrorMessage } from "../constants/errorMessage";

class MessageService {
  messageRepository: MessageRepository = new MessageRepository();

  async getOrCreateChat(req: Request, res: Response) {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ error: "Sender and receiver IDs are required" });
    }

    const findSenderUser = await prismaClient.user.findUnique({
      where: {
        id: senderId,
      },
    });

    if (!findSenderUser) {
      return res.status(404).json({ error: "Receiver User user not found" });
    }
    const findReceiverUser = await prismaClient.user.findUnique({
      where: {
        id: senderId,
      },
    });

    if (!findReceiverUser) {
      return res.status(404).json({ error: "Receiver User user not found" });
    }
  }

  async saveMessage(req: Request, res: Response) {
    try {
      const { senderId, receiverId, subject, message } = req.body;

      if (!senderId || !receiverId || !subject || !message) {
        return res
          .status(400)
          .json({
            error: "Sender, receiver, subject and message are required",
          });
      }

      const findSenderUser = await prismaClient.user.findUnique({
        where: {
          id: senderId,
        },
      });

      if (!findSenderUser) {
        return res.status(404).json({ error: "Receiver User user not found" });
      }
      const findReceiverUser = await prismaClient.user.findUnique({
        where: {
          id: receiverId,
        },
      });

      if (!findReceiverUser) {
        return res.status(404).json({ error: "Receiver User user not found" });
      }

      const chat = await this.messageRepository.getOrCreateChat(
        findSenderUser.id,
        findReceiverUser.id
      );

      return res
        .status(201)
        .json({ data: chat, message: "Chat created successfully" });
    } catch (error) {
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
  async getMessages(req: Request, res: Response) {
    try {
      const { chatId } = req.params;

      if (!chatId) {
        return res.status(400).json({ error: "Chat ID is required" });
      }

      const messages = await this.messageRepository.getMessages(chatId);

      if (messages.length === 0) {
        return res.status(404).json({ error: "No messages found" });
      }

      return res.status(200).json(messages);
    } catch (err) {
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getChatsByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;

     const user = await prismaClient.user.findUnique({
       where: {
         id: userId,
       },
       include: {
         ong: true,
         adopter: true,
       },
     });

     if (!user) {
       return res.status(404).json({ error: "Usuário não encontrado." });
     }
      let ownerId: string | undefined;

      if (user.ong) {
        ownerId = user.ong.id;
      } else if (user.adopter) {
        ownerId = user.adopter.id;
      } else {
        return res.status(400).json({ error: "Usuário não é uma ONG nem um adotante." });
      }


      const chats = await this.messageRepository.getChatsByUserId(ownerId);

      if (chats.length === 0) {
        return res.status(404).json({ error: "No chats found" });
      }

      res.status(200).json(chats);
    } catch (err) {
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
}

export default MessageService;

// Função que retorna o chat existente ou cria um novo entre sender e receiver
