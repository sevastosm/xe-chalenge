import mongoose, { Schema, Document } from 'mongoose';

export interface IAd extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdSchema: Schema = new Schema({
  area: { type: Object, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true
});

export default mongoose.model<IAd>('Ad', AdSchema); 