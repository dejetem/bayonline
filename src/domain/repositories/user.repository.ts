import { UserModel } from "../entities/user.entity";
import { User } from "../entities/user.entity";

export const UserRepository = {
  async create(user: User) {
    return UserModel.create(user);
  },

  async findByUsername(username: string) {
    return UserModel.findOne({ username });
  },

  async findById(id: string) {
    return UserModel.findById(id);
  },
};
