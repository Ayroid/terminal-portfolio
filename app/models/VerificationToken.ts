import mongoose, { Schema } from 'mongoose'
import { IVerificationToken } from '@/types/mongoose'

const VerificationTokenSchema = new Schema<IVerificationToken>({
  identifier: String,
  token: {
    type: String,
    unique: true
  },
  expires: Date,
})

VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true })

export const VerificationToken = mongoose.models.VerificationToken ||
  mongoose.model<IVerificationToken>('VerificationToken', VerificationTokenSchema)