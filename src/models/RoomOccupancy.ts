import mongoose, { Schema, Document } from "mongoose";

interface IRoomOccupancy extends Document {
  empty: number;
  filled: number;
}

const RoomOccupancySchema: Schema = new Schema({
  empty: { type: Number, required: true },
  filled: { type: Number, required: true },
});

export default mongoose.model<IRoomOccupancy>("RoomOccupancy", RoomOccupancySchema);
