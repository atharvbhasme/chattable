import type { FastifyRequest, FastifyReply } from 'fastify';
import { UserModel } from '../models/user.model.ts';

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email } = request.body as { email: string };
    await UserModel.updateOne({
        email: email
    }, {
        isOnline: false
    })
    reply.status(200).send("succfully logout from app")
}

export const getOnlineUsers = async (request_: FastifyRequest, reply: FastifyReply) => {
    let onlineUsers;
    try {
        onlineUsers = await UserModel.find({
            isOnline: true
        });
    } catch (error) {
        reply.status(500).send("Error fetching online users");
        return;
    }

    if(onlineUsers.length > 0){
        reply.status(200).send(onlineUsers)
    }else{
        reply.status(200).send("currently there no online users")
    }
}

export const getAllUsers = async (request_: FastifyRequest, reply: FastifyReply) => {
    let allUsers;
    try {
        allUsers = await UserModel.find();
    } catch (error) {
        reply.status(500).send("Error fetching online users");
        return;
    }

    if(allUsers.length > 0){
        reply.status(200).send(allUsers)
    }else{
        reply.status(500).send("No users present in system")
    }
}