import { Token } from "../types/token";
interface JWTOption {
    expiresIn?: string | number;
}
export declare const createJWT: (user: Token, option?: JWTOption) => string;
export declare const verifyJWT: (token: string) => Token;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const hashPassword: (password: string) => Promise<string>;
export {};
