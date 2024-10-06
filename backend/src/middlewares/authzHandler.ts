import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../auth/authUtils";
import { UnauthorizedError } from "../error/customError";

const authorization = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    throw new UnauthorizedError("Unauthorized access");
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    throw new UnauthorizedError("Unauthorized token");
  }

  try {
    const decodedPayload = verifyJWT(token);
    req.user = decodedPayload;
    next();
  } catch (error) {
    console.error(error);
    next(new UnauthorizedError("Unauthorized token"));
  }
};

export default authorization;
