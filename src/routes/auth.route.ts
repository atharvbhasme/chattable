import type { FastifyInstance } from 'fastify';
import { register, login} from '../controller/auth.controller.ts'

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/register', register);
  fastify.post('/auth/login', login);
}
