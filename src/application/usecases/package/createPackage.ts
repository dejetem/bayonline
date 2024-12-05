import { CreatePackageDTO } from "../../dto/package.dto";
import { PackageRepository } from "../../../domain/repositories/package.repository";
import { Package } from "../../../domain/entities/package.entity";

export const createPackage = async (pkg: CreatePackageDTO, createdBy: string): Promise<Package> => {
  return PackageRepository.create({ ...pkg, createdBy });
};
