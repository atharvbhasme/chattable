import type { FastifyInstance } from 'fastify';
import { getAllUsers, getUserById, logout } from '../controller/user.controller.ts';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('user/:id/logout', logout);
  fastify.get('/users', getAllUsers);
  fastify.get('/users/:userId', getUserById);
}