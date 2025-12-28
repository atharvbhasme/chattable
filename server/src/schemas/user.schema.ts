import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date },
  requests: [{
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
