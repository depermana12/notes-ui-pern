import { Request, Response, NextFunction } from "express";

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

const asyncHandler = (fn: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
