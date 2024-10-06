import { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
    status?: number;
    type?: string;
}
declare const globalErrorHandler: (err: CustomError, req: Request, res: Response, next: NextFunction) => void;
export default globalErrorHandler;
