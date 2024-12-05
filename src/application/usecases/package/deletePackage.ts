import { PackageRepository } from "../../../domain/repositories/package.repository";
import { adminMiddleware } from "../../../infrastructure/middleware/authMiddleware";

export const deletePackage = async (id: string, user: any) => {
  adminMiddleware(user); // Only admin can delete
  return PackageRepository.delete(id);
};
