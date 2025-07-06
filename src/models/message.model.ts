import { model } from 'mongoose';
import { MessageSchema } from '../schemas/message.schema.ts';

export const MessageModel = model('Message', MessageSchema);
