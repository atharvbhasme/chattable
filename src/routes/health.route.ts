import type { FastifyInstance } from 'fastify';
import { healthCheck }  from '../controller/health.controller.ts'

export default async function health(fastify: FastifyInstance) {
  fastify.get('/health', healthCheck);
}
