import "express-serve-static-core";
import { Token } from "../token";

declare module "express-serve-static-core" {
  interface Request {
    user: Token;
  }
}
