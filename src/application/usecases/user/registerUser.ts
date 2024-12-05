import bcrypt from "bcrypt";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { RegisterUserDTO } from "../../dto/user.dto";
import { User } from "../../../domain/entities/user.entity";

const SALT_ROUNDS = 10;

export const registerUser = async (userDTO: RegisterUserDTO): Promise<User> => {
  const { username, password, role } = userDTO;

  // Check if the user already exists
  const existingUser = await UserRepository.findByUsername(username);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await UserRepository.create({ username, password: hashedPassword, role });
  return user;
};
