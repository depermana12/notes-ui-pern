import { User } from "../schemas/user";
export declare const fetchAllUser: () => Promise<User[]>;
export declare const fetchUserById: (id: number) => Promise<User | null>;
export declare const fetchUserByEmail: (email: string) => Promise<User | null>;
export declare const fetchUserByUsername: (username: string) => Promise<User | null>;
export declare const saveUser: (username: string, email: string, password: string) => Promise<User>;
