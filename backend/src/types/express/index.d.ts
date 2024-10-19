import "express-serve-static-core";
import { Token } from "../../auth/authTokenTypes";

declare module "express-serve-static-core" {
  interface Request {
    user: Token;
  }
}
