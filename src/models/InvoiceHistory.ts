import mongoose, { Schema, Document } from "mongoose";

interface IInvoiceHistory extends Document {
  userId: mongoose.Types.ObjectId;
  bill: number;
  created_at: Date;
}

const InvoiceHistorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bill: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IInvoiceHistory>(
  "InvoiceHistory",
  InvoiceHistorySchema
);
