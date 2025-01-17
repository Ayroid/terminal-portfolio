import mongoose, { Schema } from 'mongoose'
import { ISession } from '@/types/mongoose'

const SessionSchema = new Schema<ISession>({
  userId: {
    type: String,
    ref: 'User'
  },
  expires: Date,
  sessionToken: {
    type: String,
    unique: true
  },
})

export const Session = mongoose.models.Session ||
  mongoose.model<ISession>('Session', SessionSchema)