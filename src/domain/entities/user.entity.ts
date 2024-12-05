import { Schema, model } from "mongoose";

export interface User {
  id?: string;
  username: string;
  password: string;
  role: "user" | "admin";
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin"], default: "user" },
});

export const UserModel = model<User>("User", UserSchema);
