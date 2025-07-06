import type { FastifyInstance } from 'fastify';
import { getAllUsers, getOnlineUsers, logout } from '../controller/user.controller.ts';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/logout', logout);
  fastify.get('/getAllUsers', getAllUsers);
  fastify.get('/getOnlineUsers', getOnlineUsers);
}