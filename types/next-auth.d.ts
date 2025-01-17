import { ObjectId } from "mongodb"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    _id: ObjectId
    name?: string | null
    email?: string | null
    image?: string | null
    emailVerified?: Date | null
  }
}