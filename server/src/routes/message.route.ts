// src/routes/message.route.ts
import type { FastifyInstance } from 'fastify';
import { getMessageForSingleUser, getMessagesForUser, postMessagesForUser } from '../controller/message.controller.ts'

export default async function messageRoutes(fastify: FastifyInstance) {
  fastify.get('/getMessagesForUser', {
    schema: {
      querystring: {
        type: 'object',
        required: ['senderId'],
        properties: {
          userId: { type: 'string', minLength: 24, maxLength: 24 },
          receiverID: {type: 'string', minLength: 24, maxLength: 24}
        }
      }
    },
    handler: getMessagesForUser
  });

  fastify.get('/getMessageForSingleUser',{
     schema: {
      querystring: {
        type: 'object',
        required: ['senderId'],
        properties: {
          userId: { type: 'string', minLength: 24, maxLength: 24 },
        }
      }
    },
    handler: getMessageForSingleUser
  })

  fastify.post('/postMessageForUser', postMessagesForUser)
  
}
