import type { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.ts';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password, email } = request.body as { username: string, password: string, email: string };

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return reply.status(409).send({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({ username, password: hashedPassword, email: email });

  return reply.status(201).send({ message: 'User registered' });
}

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as { username: string, password: string };

  const user = await UserModel.findOne({ username });
  if (!user) {
    return reply.status(404).send({ message: 'User not found' });
  } else {
    if (!user.password) {
      return reply.status(500).send({ message: 'User password is missing' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return reply.status(401).send({ message: 'Invalid credentials' });

    await UserModel.updateOne({
      email: user.email
    }, {
      isOnline: true
    })

    const userId = user._id
    const username = user.username
    const email = user.email
    const token = await reply.jwtSign({ userId: user._id, username: user.username }, {
      sign: {
        expiresIn: 60 * 60
      }
    });
    console.log(`email : ${email}`)
    return reply.send({ token, userId, username, email });
  }
}