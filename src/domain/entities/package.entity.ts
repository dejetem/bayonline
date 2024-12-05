import { Schema, model } from "mongoose";

export interface Package {
  id?: string;
  name: string;
  description: string;
  price: number;
  expirationDate: Date;
  createdBy: string; // User ID of the creator
}

const PackageSchema = new Schema<Package>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  createdBy: { type: String, required: true },
});

export const PackageModel = model<Package>("Package", PackageSchema);
