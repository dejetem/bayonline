import { Schema, model } from "mongoose";
import { Package } from "../entities/package.entity";

const PackageSchema = new Schema<Package>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  createdBy: { type: String, required: true },
});

export const PackageModel = model<Package>("Package", PackageSchema);

export const PackageRepository = {
  async create(pkg: Package) {
    return PackageModel.create(pkg);
  },
  async findById(id: string) {
    return PackageModel.findById(id);
  },
  async findAll(filter: { expirationDate?: { $gte?: Date; $lte?: Date } } = {}) {
    return PackageModel.find(filter);
  },
  async update(id: string, data: Partial<Package>) {
    return PackageModel.findByIdAndUpdate(id, data, { new: true });
  },
  async delete(id: string) {
    return PackageModel.findByIdAndDelete(id);
  },
};
