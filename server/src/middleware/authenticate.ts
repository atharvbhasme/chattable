import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export const authMiddleware = (app: FastifyInstance) => {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const openRoutes = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/health',
    ];

    const path = request.routeOptions.url || request.url.split('?')[0];

    if (openRoutes.includes(path)) {
      return;
    }

    try {
      // @ts-ignore
      await app.authenticate(request, reply);
    } catch (err) {
        console.log("Error: ", err)
    }
  };
};
