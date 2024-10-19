import pool from "./db";

export interface RefreshToken {
  id: number;
  token: string;
  expires_at: number;
}

export const saveRefreshTokenToDB = async (
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

export const findRefreshTokenInDB = async (
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

export const renewRefreshTokenInDB = async (
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

export const deleteRefreshTokenFromDB = async (
  id: number,
): Promise<boolean> => {
  const deleted = await pool.query(
    `DELETE FROM refresh_token WHERE user_id = $1`,
    [id],
  );
  return deleted.rowCount !== null && deleted.rowCount > 0;
};
