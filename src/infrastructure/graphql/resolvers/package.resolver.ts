import { createPackage } from "../../../application/usecases/package/createPackage";
import { readPackages, readPackageById } from "../../../application/usecases/package/readPackages";
import { updatePackage } from "../../../application/usecases/package/updatePackage";
import { deletePackage } from "../../../application/usecases/package/deletePackage";
import { authMiddleware } from "../../middleware/authMiddleware";

export const packageResolvers = {
  Query: {
    getPackages: async (_: any, { minDate, maxDate }: { minDate?: string; maxDate?: string }) => {
      const filter = {
        minDate: minDate ? new Date(minDate) : undefined,
        maxDate: maxDate ? new Date(maxDate) : undefined,
      };
      return readPackages(filter);
    },
    getPackageById: (_: any, { id }: any) => readPackageById(id),
  },

  Mutation: {
    createPackage: async (_: any, args: any, context: any) => {
      const user = authMiddleware(context);
      return createPackage(args, user.id);
    },

    updatePackage: async (_: any, { id, ...data }: any, context: any) => {
      const user = authMiddleware(context);
      return updatePackage(id, data, user);
    },

    deletePackage: async (_: any, { id }: any, context: any) => {
      const user = authMiddleware(context);
      return deletePackage(id, user);
    },
  },
};
