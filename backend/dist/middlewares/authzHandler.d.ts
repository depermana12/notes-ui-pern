import { Request, Response, NextFunction } from "express";
declare const authorization: (req: Request, res: Response, next: NextFunction) => void;
export default authorization;
