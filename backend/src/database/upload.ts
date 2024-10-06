import pool from "./db";
import Avatar from "../schemas/avatar";

const upload = async (file: string, userId: number): Promise<Avatar> => {
  const { rows } = await pool.query(
    `
    INSERT INTO users_photo (filename, user_id)
      VALUES ($1, $2) RETURNING *`,
    [file, userId],
  );
  return rows[0];
};

export default { upload };
