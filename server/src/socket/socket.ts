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
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // 1. User comes online
    socket.on('user-online', async (userId: string) => {
      userSockets[userId] = socket.id;

      await UserModel.findByIdAndUpdate(userId, {
        isOnline: true,
        lastSeen: new Date(),
      });

      io.emit('online-users', Object.keys(userSockets)); // broadcast list
    });

    // 2. Private messaging
    socket.on('send-message', async ({ sender, receiver, content }) => {
      const message = new MessageModel({ sender, receiver, content });
      await message.save();

      const toSocketId = userSockets[receiver];
      if (toSocketId) {
        io.to(toSocketId).emit('receive-message', {
          sender,
          content,
          createdAt: message.createdAt,
        });
      }

      // Optionally echo back to sender (for local UI update)
      socket.emit('receive-message', {
        sender,
        content,
        createdAt: message.createdAt,
      });
    });

    // 3. WebRTC signaling (video call)
    socket.on('video-signal', ({ to, from, signal }) => {
      const toSocketId = userSockets[to];
      if (toSocketId) {
        io.to(toSocketId).emit('video-signal', { from, signal });
      }
    });

    // 5. Friend Requests
    socket.on('send-request', async ({ from, to }) => {
      try {
        const receiver = await UserModel.findById(to);
        if (receiver) {
          // Check if request already exists
          const existingRequest = receiver.requests.find(
            (req: any) => req.from.toString() === from
          );

          if (!existingRequest) {
            receiver.requests.push({ from, status: 'pending' });
            await receiver.save();

            const toSocketId = userSockets[to];
            if (toSocketId) {
              io.to(toSocketId).emit('request-received', { from });
            }
          }
        }
      } catch (error) {
        console.error('Error sending request:', error);
      }
    });

    socket.on('accept-request', async ({ from, to }) => {
      // 'from' is the one who sent the request (original sender)
      // 'to' is the one accepting it (current user)
      try {
        const receiver = await UserModel.findById(to); // The one accepting
        const sender = await UserModel.findById(from); // The one who sent request

        if (receiver && sender) {
          const request = receiver.requests.find(
            (req: any) => req.from.toString() === from
          );

          if (request) {
            request.status = 'accepted';
            receiver.friends.push(from);
            await receiver.save();

            sender.friends.push(to);
            await sender.save();

            const senderSocketId = userSockets[from];
            if (senderSocketId) {
              io.to(senderSocketId).emit('request-accepted', { by: to });
            }

            // Also notify the acceptor that it's done (optional, but good for UI)
            socket.emit('request-accepted', { by: to });
          }
        }
      } catch (error) {
        console.error('Error accepting request:', error);
      }
    });

    // 4. Disconnect
    socket.on('disconnect', async () => {
      const userId = Object.keys(userSockets).find(
        (key) => userSockets[key] === socket.id,
      );
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
