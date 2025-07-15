// src/routes/message.route.ts
import type { FastifyInstance } from 'fastify';
import { getMessagesForUser, postMessagesForUser } from '../controller/message.controller.ts'

export default async function messageRoutes(fastify: FastifyInstance) {
  fastify.get('/getMessagesForUser', {
    schema: {
      querystring: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string', minLength: 24, maxLength: 24 }
        }
      }
    },
    handler: getMessagesForUser
  });

  fastify.post('/postMessageForUser', postMessagesForUser)
  
}
