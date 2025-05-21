import prismaClient from "../database";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  subject: string;
  message: string;
}

// Função que retorna o chat existente ou cria um novo entre sender e receiver
async function getOrCreateChat(senderId: string, receiverId: string) {
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

export async function saveMessage(data: MessagePayload) {
  const chat = await getOrCreateChat(data.senderId, data.receiverId);

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
export async function getMessages(chatId: string) {
  return await prismaClient.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}