import { Server } from 'socket.io';
import type { FastifyInstance } from 'fastify';
import { UserModel } from '../models/user.model.ts';
import { MessageModel } from '../models/message.model.ts';

let io: Server;
interface UserSocketMap {
  [userId: string]: string; // maps userId -> socketId
}

const userSockets: UserSocketMap = {};

export const setupSocket = (server: FastifyInstance) => {
  io = new Server(server.server, {
    cors: {
      // origin: 'http://localhost:3000', // your frontend
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

     // 1. Handle user login
      socket.on('user-online', async (userId: string) => {
        userSockets[userId] = socket.id;

        await UserModel.findByIdAndUpdate(userId, {
          isOnline: true,
          lastSeen: new Date(),
        });

        io.emit('online-users', Object.keys(userSockets));
      });

      // 2. Send chat request
      socket.on('chat-request', ({ fromUserId, toUserId }) => {
        const toSocketId = userSockets[toUserId];
        if (toSocketId) {
          io.to(toSocketId).emit('incoming-chat-request', {
            fromUserId,
            socketId: socket.id,
          });
        }
      });

      // 3. Accept chat request
      socket.on('accept-chat-request', ({ fromUserId, toUserId, roomId }) => {
        const fromSocketId = userSockets[fromUserId];
        if (fromSocketId) {
          io.to(fromSocketId).emit('chat-request-accepted', { roomId });
        }

        socket.join(roomId);
        io.to(fromSocketId).emit('join-room', { roomId });
        socket.join(roomId);
      });

      // 4. Handle chat messages
      socket.on('send-message', async (msgData) => {
        const { sender, receiver, roomId, content } = msgData;

        const message = new MessageModel({
          sender,
          receiver,
          roomId,
          content,
        });
        await message.save();

        io.to(roomId).emit('receive-message', {
          sender,
          content,
          createdAt: message.createdAt,
        });
      });

      // 5. WebRTC signaling (video call setup)
      socket.on('video-signal', ({ to, from, signal }) => {
        const toSocketId = userSockets[to];
        if (toSocketId) {
          io.to(toSocketId).emit('video-signal', { from, signal });
        }
      });

      // 6. Mark messages as read
      socket.on('mark-read', async ({ roomId, userId }) => {
        await MessageModel.updateMany(
          { roomId, receiver: userId, read: false },
          { $set: { read: true } }
        );
      });

   socket.on('disconnect', async () => {
        const userId = Object.keys(userSockets).find(key => userSockets[key] === socket.id);
        if (userId) {
          delete userSockets[userId];
          await UserModel.findByIdAndUpdate(userId, {
            isOnline: false,
            lastSeen: new Date(),
          });

          io.emit('online-users', Object.keys(userSockets));
        }

        console.log('❌ Client disconnected:', socket.id);
      });
  });
};

export const getIO = () => io;
