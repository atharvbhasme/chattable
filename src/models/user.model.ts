import { model } from 'mongoose';
import { UserSchema } from '../schemas/user.schema.ts';

export const UserModel = model('User', UserSchema);
