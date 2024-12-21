import mongoose, { Schema, Document } from "mongoose";

interface IDetailPenghuni extends Document {
    userId: mongoose.Types.ObjectId | null;
  StatusPembayaran: string;
  TanggalPembayaran: Date;
  TagihanBulan: string;
}

const DetailPenghuniSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  StatusPembayaran: { type: Schema.Types.String, required: true },
  TanggalPembayaran: { type: Date, required: true },
    TagihanBulan: { type: Schema.Types.String, required: true },
});

export default mongoose.model<IDetailPenghuni>("DetailPenghuni", DetailPenghuniSchema);
