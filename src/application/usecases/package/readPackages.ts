import { PackageRepository } from "../../../domain/repositories/package.repository";

export const readPackages = async (filter: { minDate?: Date; maxDate?: Date }) => {
  const query: { expirationDate?: { $gte?: Date; $lte?: Date } } = {};

  if (filter.minDate) {
    query.expirationDate = { ...query.expirationDate, $gte: filter.minDate };
  }

  if (filter.maxDate) {
    query.expirationDate = { ...query.expirationDate, $lte: filter.maxDate };
  }

  return PackageRepository.findAll(query);
};

export const readPackageById = async (id: string) => {
  return PackageRepository.findById(id);
};
