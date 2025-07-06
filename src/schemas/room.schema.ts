// schemas/room.schema.ts
import { Schema, Types } from 'mongoose';

export const RoomSchema = new Schema({
  name: { type: String },
  participants: [{ type: Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
