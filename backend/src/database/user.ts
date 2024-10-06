import pool from "./db";
import { User } from "../schemas/user";

type Field = "user_id" | "email" | "username";
type UpdateUser = "username" | "email" | "password";

export const findAllUsers = async (): Promise<User[]> => {
  const { rows } = await pool.query<User>(
    `SELECT user_id, username, email, created_at
       FROM users`,
  );
  return rows;
};

export const findUserBy = async (
  field: Field,
  value: string | number,
): Promise<User | null> => {
  const { rows } = await pool.query<User>(
    `SELECT * 
       FROM users
     WHERE ${field} = $1`,
    [value],
  );
  return rows[0];
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
): Promise<User> => {
  const { rows } = await pool.query<User>(
    `INSERT INTO users(username, email, password)
       VALUES($1, $2, $3) RETURNING *`,
    [username, email, password],
  );
  return rows[0];
};

export const updateUserBy = async (
  field: UpdateUser,
  value: string,
  id: number,
): Promise<User> => {
  const { rows } = await pool.query<User>(
    `UPDATE users
       SET ${field} = $1
     WHERE user_id = $2 RETURNING *`,
    [value, id],
  );
  return rows[0];
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM users WHERE user_id = $1`, [id]);
  return result.rowCount !== null && result.rowCount > 0;
};
