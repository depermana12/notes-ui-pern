import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import { UnauthorizedError } from "../error/customError";
import { Token } from "../types/token";

interface JWTOption {
  expiresIn?: string | number;
}

export const createJWT = (user: Token, option: JWTOption = {}): string => {
  const token = jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: option.expiresIn || "7d" },
  );

  return token;
};

export const verifyJWT = (token: string): Token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as Token;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Token expired");
    }
    throw new UnauthorizedError("Invalid token");
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bycrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string): Promise<string> => {
  return bycrypt.hash(password, 10);
};
