import { registerUser } from "../../../application/usecases/user/registerUser";
import { loginUser } from "../../../application/usecases/user/loginUser";
import { logoutUser } from "../../../application/usecases/user/logoutUser";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { AuthenticatedUser } from "../../../application/interfaces/auth.interface";

export const userResolvers = {
  Mutation: {
    registerUser: async (_: any, args: any) => {
      const { username, password, role } = args;
      const user = await registerUser({ username, password, role });
      return user;
    },

    loginUser: async (_: any, args: any) => {
      const { username, password } = args;
      const token = await loginUser({ username, password });
      return { token };
    },

    logoutUser: (_: any, __: any, context: any) => {
      logoutUser();
      return { success: true };
    },
  },
};
