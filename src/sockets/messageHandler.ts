import { Server, Socket } from 'socket.io';
import { saveMessage } from './messageService';

interface MessagePayload {
  senderId: string;
  receiverId: string;
  subject: string;
  message: string;
}

export function messageHandler(io: Server, socket: Socket) {
  socket.on('send_message', async (data: MessagePayload) => {
    try {
      const savedMessage = await saveMessage(data);
      
      // Envia para o destinatário se estiver conectado
      io.to(data.receiverId).emit('receive_message', savedMessage);

      // Confirmação de envio para o remetente
      socket.emit('message_sent', savedMessage);
    } catch (err) {
      console.error('Erro ao salvar mensagem:', err);
      socket.emit('error_message', 'Erro ao enviar a mensagem');
    }
  });

  socket.on('join', (userId: string) => {
    socket.join(userId); // Junta o socket a uma "sala" com o id do usuário
  });
}
