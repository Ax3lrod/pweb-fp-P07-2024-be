import mongoose, { Schema, Document } from "mongoose";

interface IDamageReporting extends Document {
  userId: mongoose.Types.ObjectId | null;
  message: string;
  createdAt: Date; 
}

const DamageReportingSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    message: { type: String, required: true },
    createdAt: {  type: Date, 
        default: () => {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Reset waktu ke 00:00:00
          return today} }, 
  },
  {
    timestamps: false, // Nonaktifkan otomatis `createdAt` dan `updatedAt` bawaan jika ingin manual
  }
);

export default mongoose.model<IDamageReporting>(
  "DamageReporting",
  DamageReportingSchema
);
