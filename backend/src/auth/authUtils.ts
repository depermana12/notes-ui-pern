import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error/customError";
import { Token, JWTOption } from "./authTokenTypes";

export const createJWT = (user: Token, option: JWTOption = {}): string => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: option.expiresIn || "10m" },
  );

  return token;
};

export const createRefreshJWT = (user: Token): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "1d" },
  );
};

export const verifyJWT = (
  token: string,
  secret: string = process.env.JWT_SECRET as string,
): Token => {
  try {
    return jwt.verify(token, secret) as Token;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Token expired");
    }
    throw new UnauthorizedError("Invalid token");
  }
};
