import { coreDB } from '../connections/index'
import { Schema, InferSchemaType } from 'mongoose'

const UserSchema = new Schema(
  {
    cognitoSub: { type: String, required: true },
    displayName: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: 'active', required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { collection: 'users', timestamps: true },
)

export type IUser = InferSchemaType<typeof UserSchema>

const User = coreDB.model<IUser>('User', UserSchema)

export default User
