import pool from "./db";
import { User, RefreshToken } from "../schemas/user";

type Field = "id" | "email" | "username";
type UpdateUser = "username" | "email" | "password";

export const findAllUsers = async (): Promise<User[]> => {
  const { rows } = await pool.query<User>(
    `SELECT id, username, email, created_at
       FROM users`,
  );
  return rows;
};

export const saveRefreshToken = async (
  token: string,
  userId: number,
  expiresIn: Date,
): Promise<RefreshToken> => {
  const { rows } = await pool.query<RefreshToken>(
    `INSERT INTO refresh_token(token, user_id, expires_at)
       VALUES($1, $2, $3) RETURNING *`,
    [token, userId, expiresIn],
  );
  return rows[0];
};

export const findRefreshToken = async (
  userId: number,
): Promise<RefreshToken | null> => {
  const { rows } = await pool.query<RefreshToken>(
    `SELECT * 
       FROM refresh_token
     WHERE user_id = $1`,
    [userId],
  );
  return rows[0];
};

export const renewRefreshToken = async (
  userId: number,
  newToken: string,
  expires: Date,
): Promise<RefreshToken> => {
  const { rows } = await pool.query<RefreshToken>(
    `
    UPDATE refresh_token SET token = $1, expires_at = $2 WHERE user_id = $3 RETURNING *
    `,
    [newToken, expires, userId],
  );

  return rows[0];
};

export const deleteRefreshToken = async (id: number): Promise<boolean> => {
  const deleted = await pool.query(
    `DELETE FROM refresh_token WHERE user_id = $1`,
    [id],
  );
  return deleted.rowCount !== null && deleted.rowCount > 0;
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
     WHERE id = $2 RETURNING *`,
    [value, id],
  );
  return rows[0];
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result.rowCount !== null && result.rowCount > 0;
};
