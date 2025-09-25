import mongoose, { Schema, Document } from "mongoose";
export enum Role {
  ADMIN = "admin",
  USER = "user",
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  role: Role;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_email_verified: { type: Boolean, required: false, default: false },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
