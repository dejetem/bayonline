import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { verifyJWT } from "../../utils/jwt";
import { AuthenticatedUser } from "../../application/interfaces/auth.interface";

export const authMiddleware = (context: any): AuthenticatedUser => {
  const token = context.req.headers.authorization?.split(" ")[1];
  if (!token) throw new AuthenticationError("Unauthorized");

  const user = verifyJWT(token) as AuthenticatedUser;
  if (!user) throw new AuthenticationError("Invalid Token");

  return user;
};

// Role-based access control: Admin only for update and delete
export const adminMiddleware = (user: AuthenticatedUser) => {
  if (user.role !== "admin") {
    throw new ForbiddenError("Only admins can perform this action");
  }
};
