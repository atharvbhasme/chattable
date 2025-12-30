import type { FastifyRequest, FastifyReply } from 'fastify';
import { UserModel } from '../models/user.model.ts';
import { MessageModel } from '../models/message.model.ts';
import type { GetMessagesForSingelUserQuery, GetMessagesQuery, messageInput } from '../types/message.ts';

export const getMessagesForUser = async (
  request: FastifyRequest<{ Querystring: GetMessagesQuery }>,
  reply: FastifyReply
) => {
  const { senderId, receiverID } = request.query;
  if (!senderId.match(/^[a-fA-F0-9]{24}$/)) {
    return reply.code(400).send({ error: 'Invalid MongoDB userId' });
  }

  const messages = await MessageModel.find({
  $or: [
    { sender: senderId, receiver: receiverID },
    { sender: receiverID, receiver: senderId },
  ],
}).sort({ createdAt: -1 });

  console.log(`message`, messages)

  return reply.send({ messages });
};

export const getMessageForSingleUser = async ( request: FastifyRequest<{Querystring: GetMessagesForSingelUserQuery}>, reply: FastifyReply)=>{
  const { senderId } = request.query;
  if (!senderId.match(/^[a-fA-F0-9]{24}$/)) {
    return reply.code(400).send({ error: 'Invalid MongoDB userId' });
  }
  const messages = await MessageModel.find({
    sender: senderId
  });

  console.log(`message`, messages)

  return reply.send({ messages });
}


export const postMessagesForUser = async ( request: FastifyRequest, reply: FastifyReply) => {
    const input = request.body  as messageInput;
    try {
        await MessageModel.create(input);
    } catch (error) {
        return reply.status(500).send({ error: 'Failed to save message', details: error });
    }
    return reply.status(201).send({ message: 'Message Saved' });
}