import mongoose, { Schema, Document } from "mongoose";

type Role = "ADMIN" | "USER";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
