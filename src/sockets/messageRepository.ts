import prismaClient from "../database";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  subject: string;
  message: string;
}

class MessageRepository {
async getOrCreateChat(senderId: string, receiverId: string) {
    // Buscamos chat onde esses dois estão relacionados
    let chat = await prismaClient.chat.findFirst({
      where: {
        OR: [
          { adopterId: senderId, ongId: receiverId },
          { adopterId: receiverId, ongId: senderId },
        ],
      },
    });

    if (!chat) {
      // Criar chat novo, assumindo que senderId é adotante e receiverId é ONG
      // Você pode adaptar a lógica para verificar quem é adopter e quem é ong
      chat = await prismaClient.chat.create({
        data: {
          adopterId: senderId,
          ongId: receiverId,
        },
      });
    }

    return chat;
  }

  async saveMessage(data: MessagePayload) {
    const findOng = await prismaClient.ong.findUnique({
      where: {
        userId: data.receiverId,
      },
    });

    const findAdopter = await prismaClient.adopter.findUnique({
      where: {
        userId: data.senderId,
      },
    });

    if (!findOng) {
      throw new Error("ONG não encontrada");
    }

    if (!findAdopter) {
      throw new Error("ADOPTER não encontrada");
    }

    const chat = await this.getOrCreateChat(findAdopter.id, findOng.id);

    return await prismaClient.message.create({
      data: {
        chatId: chat.id,
        senderId: data.senderId,
        receiverId: data.receiverId,
        body: data.message,
        subject: data.subject,
      },
    });
  }
  async getMessages(chatId: string) {
    const chats = await prismaClient.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        chat: {
          select: {
            adopter: {
              select: {
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            ong: {
              select: {
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const formattedData = chats.map((chat) => {
      return {
        id: chat.id,
        chatId: chat.chatId,
        senderId: chat.senderId,
        receiverId: chat.receiverId,
        body: chat.body,
        subject: chat.subject,
        createdAt: chat.createdAt,
        adopterId: chat.chat?.adopter?.user,
        adopterName: chat.chat?.adopter?.user.name,
        ongId: chat.chat?.ong?.user.id,
        ongName: chat.chat?.ong?.user.name,
      };
    });

    return formattedData;
  } 

  async getChatsByUserId(userId: string) {
      const chats = await prismaClient.chat.findMany({
        where: {
          OR: [{ adopterId: userId }, { ongId: userId }],
        },
        include: {
          adopter: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          ong: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      const lastMessage = await Promise.all(
        chats.map(async (chat) => {
          const lastMessage = await prismaClient.message.findFirst({
            where: {
              chatId: chat.id,
            },
            orderBy: {
              createdAt: "desc",
            },
            select: {
              subject: true,
              body: true,
            },
          });

          return {
            ...chat,
            lastMessage,
          };
        }))

      const formattedData = chats.map((chat) => {
        return(
          {
            id: chat.id,
            adopterId: chat.adopterId,
            ongId: chat.ongId,
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
            adopterName: chat.adopter?.user.name,
            ongName: chat.ong?.user.name,
            lastMessage: lastMessage.find((message) => message.id === chat.id)?.lastMessage,
          }
        )
      })

    return formattedData;
  }
}

export default MessageRepository;