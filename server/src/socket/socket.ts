import { Server } from 'socket.io';
import type { FastifyInstance } from 'fastify';

let io: Server;

export const setupSocket = (server: FastifyInstance) => {
  io = new Server(server.server, {
    cors: {
      origin: 'http://localhost:5173', // your frontend
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    socket.on('join', (roomId) => {
      socket.join(roomId);
      console.log(`👥 ${socket.id} joined room: ${roomId}`);
    });

    socket.on('sendMessage', (data) => {
      const { roomId, message, sender } = data;
      io.to(roomId).emit('receiveMessage', {
        message,
        sender,
        time: new Date().toISOString()
      });
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
};

export const getIO = () => io;
