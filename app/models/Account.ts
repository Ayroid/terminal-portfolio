import mongoose, { Schema } from 'mongoose'
import { IAccount } from '@/types/mongoose'

const AccountSchema = new Schema<IAccount>({
  userId: {
    type: String,
    ref: 'User'
  },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
})

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true })

export const Account = mongoose.models.Account ||
  mongoose.model<IAccount>('Account', AccountSchema)
