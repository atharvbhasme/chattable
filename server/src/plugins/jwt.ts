import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt'; 
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

const jwtPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'your-secret-key',
  });

  fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });
};

export default fp(jwtPlugin);
