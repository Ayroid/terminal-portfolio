import mongoose, { Schema } from 'mongoose'
import { IUser } from '@/types/mongoose'

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      sparse: true
    },
    emailVerified: Date,
    image: String,
  },
  {
    timestamps: true
  }
)

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
