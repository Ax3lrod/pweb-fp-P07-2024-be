import { model, Schema, Document } from "mongoose";

interface IUserReport extends Document {
  message: string;
  createdAt: Date;
}

const UserReportSchema: Schema = new Schema({
  message: { type: String, required: true },
  createdAt: 
  { type: Date, 
    default: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset waktu ke 00:00:00
      return today}}});

export default model<IUserReport>("UserReport", UserReportSchema);

