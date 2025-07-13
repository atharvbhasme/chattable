// schemas/message.schema.ts
import { Schema, Types } from 'mongoose';

export const MessageSchema = new Schema({
  sender: { type: Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Types.ObjectId, ref: 'User' }, // optional for group
  roomId: { type: Types.ObjectId, ref: 'Room' },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });
