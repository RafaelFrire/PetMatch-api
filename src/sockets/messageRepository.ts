import prismaClient from "../database";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  subject: string;
  message: string;
}

class MessageRepository {
async getOrCreateChat(adopterId: string, ongId: string) {
  let chat = await prismaClient.chat.findFirst({
    where: {
      adopterId,
      ongId,
    },
  });

  if (!chat) {
    chat = await prismaClient.chat.create({
      data: {
        adopterId,
        ongId,
      },
    });
  }

  return chat;
}


  async saveMessage(data: MessagePayload) {

    const receiver = await prismaClient.user.findUnique({
      where: {
        id: data.receiverId,
      },
      include:{
        ong: true,
        adopter: true,
      }
    });
    const sender = await prismaClient.user.findUnique({
      where: {
        id: data.senderId,
      },
      include: {
        ong: true,
        adopter: true,
      },
    });
  
    if (!receiver) {
      throw new Error("ONG não encontrada");
    }

    if (!sender) {
      throw new Error("ADOPTER não encontrada");
    }

    const senderIsAdopter = !!sender.adopter;
    const senderIsOng = !!sender.ong;
    const receiverIsAdopter = !!receiver.adopter;
    const receiverIsOng = !!receiver.ong;

    let adopterId: string | undefined;
    let ongId: string | undefined;

    if (senderIsAdopter && receiverIsOng) {
      adopterId = sender.adopter!.id;
      ongId = receiver.ong!.id;
    } else if (senderIsOng && receiverIsAdopter) {
      adopterId = receiver.adopter!.id;
      ongId = sender.ong!.id;
    } else {
      throw new Error(
        "Não foi possível identificar corretamente quem é o adotante e quem é a ONG."
      );
    }
    const chat = await this.getOrCreateChat(adopterId, ongId);

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
        adopterId: chat.chat?.adopter?.user.id,
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
        return {
          id: chat.id,
          adopterId: chat.adopter?.user.id,
          ongId: chat.ong?.user.id,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
          adopterName: chat.adopter?.user.name,
          ongName: chat.ong?.user.name,
          lastMessage: lastMessage.find((message) => message.id === chat.id)
            ?.lastMessage,
        };
      })

    return formattedData;
  }
}

export default MessageRepository;