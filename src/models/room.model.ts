import { model } from 'mongoose';
import { RoomSchema } from '../schemas/room.schema.ts';

export const RoomModel = model('Room', RoomSchema);
