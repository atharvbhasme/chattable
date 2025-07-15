import type { FastifyRequest, FastifyReply } from 'fastify';
import { UserModel } from '../models/user.model.ts';
import { MessageModel } from '../models/message.model.ts';
import type { GetMessagesQuery, messageInput } from '../types/message.ts';

export const getMessagesForUser = async (
  request: FastifyRequest<{ Querystring: GetMessagesQuery }>,
  reply: FastifyReply
) => {
  const { userId } = request.query;

  if (!userId.match(/^[a-fA-F0-9]{24}$/)) {
    return reply.code(400).send({ error: 'Invalid MongoDB userId' });
  }

  const messages = await MessageModel.find({
    $or: [{ sender: userId }, { receiver: userId }]
  }).sort({ createdAt: -1 });

  return reply.send({ messages });
};


export const postMessagesForUser = async ( request: FastifyRequest, reply: FastifyReply) => {
    const input = request.body  as messageInput;
    try {
        await MessageModel.create(input);
    } catch (error) {
        return reply.status(500).send({ error: 'Failed to save message', details: error });
    }
    return reply.status(201).send({ message: 'Message Saved' });
}