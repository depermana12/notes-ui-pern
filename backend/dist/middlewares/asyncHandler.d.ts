import { Request, Response, NextFunction } from "express";
type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const asyncHandler: (fn: Controller) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default asyncHandler;
