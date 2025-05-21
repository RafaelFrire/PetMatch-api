import { Server } from "socket.io";
import { createServer } from "http";
import { messageHandler } from "./messageHandler";

export function initSocket(server: ReturnType<typeof createServer>) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Usuário conectado:", socket.id);

    socket.on("join", (userId: string) => {
      console.log(`Usuário ${userId} entrou na sala`);
      socket.join(userId);
    });

    socket.on("send_message", async (data) => {
      console.log("Recebendo mensagem:", data);
    });

    messageHandler(io, socket);
  });
}
