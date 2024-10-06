import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

interface CustomError extends Error {
  status?: number;
  type?: string;
}

const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const dev = process.env.NODE_ENV == "development";

  const errorMessage = dev
    ? { error: err.message, type: err.type }
    : `Something went wrong: ${err.type}`;
  const stackTrace = dev ? err.stack : null;

  logger.error(`${err.message}`, { stack: err.stack });

  res
    .status(err.status || 500)
    .json({ message: errorMessage, stack: stackTrace });
};

export default globalErrorHandler;
