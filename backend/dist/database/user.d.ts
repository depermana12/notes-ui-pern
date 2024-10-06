import { User } from "../schemas/user";
type Field = "user_id" | "email" | "username";
type UpdateUser = "username" | "email" | "password";
export declare const findAllUsers: () => Promise<User[]>;
export declare const findUserBy: (field: Field, value: string | number) => Promise<User | null>;
export declare const createUser: (username: string, email: string, password: string) => Promise<User>;
export declare const updateUserBy: (field: UpdateUser, value: string, id: number) => Promise<User>;
export declare const deleteUser: (id: number) => Promise<boolean>;
export {};
