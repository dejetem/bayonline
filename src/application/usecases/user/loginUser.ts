import bcrypt from "bcrypt";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { LoginUserDTO } from "../../dto/user.dto";
import { generateJWT } from "../../../utils/jwt";
import { User } from "../../../domain/entities/user.entity";

export const loginUser = async (loginDTO: LoginUserDTO): Promise<string> => {
  const { username, password } = loginDTO;

  // Find the user by username
  const user = await UserRepository.findByUsername(username);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare the password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT token
  const token = generateJWT({ id: user.id, role: user.role });
  return token;
};
