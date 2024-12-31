import { Document, Model } from 'mongoose'

export interface IUser extends Document {
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface IAccount extends Document {
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

export interface ISession extends Document {
  userId: string
  expires: Date
  sessionToken: string
}

export interface IVerificationToken extends Document {
  identifier: string
  token: string
  expires: Date
}

export interface MongooseModels {
  User: Model<IUser>
  Account: Model<IAccount>
  Session: Model<ISession>
  VerificationToken: Model<IVerificationToken>
}