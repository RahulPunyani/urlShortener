import mongoose, { Document } from 'mongoose';

export interface IUrl extends Document {
  longUrl: string;
  shortId: string;
  createdAt: Date;
  clicks: number;
}

const urlSchema = new mongoose.Schema<IUrl>({
  longUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
});

export default mongoose.model<IUrl>('Url', urlSchema);