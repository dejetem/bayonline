import { UpdatePackageDTO } from "../../dto/package.dto";
import { PackageRepository } from "../../../domain/repositories/package.repository";
import { adminMiddleware } from "../../../infrastructure/middleware/authMiddleware";

export const updatePackage = async (id: string, data: UpdatePackageDTO, user: any) => {
  adminMiddleware(user); // Only admin can update
  return PackageRepository.update(id, data);
};
