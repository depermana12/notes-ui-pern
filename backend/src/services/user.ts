import * as db from "../database/user";
import { User } from "../schemas/user";
import { createJWT, createRefreshJWT } from "../auth/authUtils";
import { hashPassword } from "../auth/passwordUtils";
import { ValidationError } from "../error/customError";
import expiresIn from "../utils/tokenAge";
import { storeRefreshToken } from "./refreshToken";

export const fetchAllUser = async (): Promise<User[]> => {
  return await db.findAllUsers();
};

export const fetchUserById = async (id: number): Promise<User | null> => {
  return await db.findUserBy("id", id);
};

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  return await db.findUserBy("email", email);
};

export const fetchUserByUsername = async (
  username: string,
): Promise<User | null> => {
  return await db.findUserBy("username", username);
};

interface SignInResponse {
  token: string;
  refreshToken: string;
  username: string;
  email: string;
  cookieConfig: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: string;
    maxAge: number;
  };
}

export const saveUser = async (
  username: string,
  email: string,
  password: string,
): Promise<SignInResponse> => {
  const user = await fetchUserByEmail(email);
  if (user) throw new ValidationError("User already exists");

  const hashedPassword = await hashPassword(password);
  const newUser = await db.createUser(username, email, hashedPassword);

  const token = createJWT(newUser);
  const refreshToken = createRefreshJWT(newUser);

  const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expiresIn.milliesecond(),
  };
  await storeRefreshToken(newUser.id, refreshToken, expiresIn.date());

  return {
    token,
    refreshToken,
    username: newUser.username,
    email: newUser.email,
    cookieConfig,
  };
};

export const modifyUserPassword = async (
  newPassword: string,
  userId: number,
) => {
  // TODO: seperate update password query, fix this information leak
  const user = await db.updateUserBy("password", newPassword, userId);
  return user;
};
