import * as db from "../database/user";
import { User } from "../schemas/user";
import { createJWT, hashPassword } from "../auth/authUtils";
import { ValidationError } from "../error/customError";

export const fetchAllUser = async (): Promise<User[]> => {
  return await db.findAllUsers();
};

export const fetchUserById = async (id: number): Promise<User | null> => {
  return await db.findUserBy("user_id", id);
};

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  return await db.findUserBy("email", email);
};

export const fetchUserByUsername = async (
  username: string,
): Promise<User | null> => {
  return await db.findUserBy("username", username);
};

export const saveUser = async (
  username: string,
  email: string,
  password: string,
): Promise<string> => {
  const user = await fetchUserByEmail(email);
  if (user) throw new ValidationError("User already exists");

  const hashedPassword = await hashPassword(password);
  const newUser = await db.createUser(username, email, hashedPassword);

  const { user_id, username: usernameToken } = newUser;
  const token = createJWT({ user_id, username: usernameToken });
  return token;
};

export const modifyUserPassword = async (
  newPassword: string,
  userId: number,
) => {
  // TODO: seperate update password query, fix this information leak
  const user = await db.updateUserBy("password", newPassword, userId);
  return user;
};
