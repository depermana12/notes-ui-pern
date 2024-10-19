import pool from "./db";
import Note from "../schemas/note";

export const searchNote = async (term: string): Promise<Note[] | null> => {
  const { rows } = await pool.query<Note>(
    `SELECT * FROM notes WHERE notes ILIKE = $1`,
    [`%${term}%`],
  );
  return rows;
};

export const getNotes = async (): Promise<Note[]> => {
  const { rows } = await pool.query<Note>(`SELECT * FROM notes`);
  return rows;
};

export const getNote = async (id: number): Promise<Note> => {
  const { rows } = await pool.query<Note>(`SELECT * FROM notes WHERE id = $1`, [
    id,
  ]);
  return rows[0];
};

export const countNotes = async (): Promise<number> => {
  const total = await pool.query(`SELECT COUNT(*) FROM notes`);
  return total.rows[0].count;
};

export const paginatedNotes = async (
  limit: number,
  offset: number,
): Promise<Note[]> => {
  const { rows } = await pool.query<Note>(
    `
    SELECT * FROM notes LIMIT $1 OFFSET $2`,
    [limit, offset],
  );
  return rows;
};

export const createNote = async (
  title: string,
  content: string,
  userId: number,
): Promise<Note> => {
  const newNote = await pool.query(
    `INSERT INTO notes(title, content, user_id)VALUES($1, $2, $3) RETURNING *`,
    [title, content, userId],
  );
  return newNote.rows[0];
};

export const updateNote = async (
  noteId: number,
  userId: number,
  title: string,
  content: string,
): Promise<Note> => {
  const updatedNote = await pool.query(
    `UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *`,
    [noteId, userId, title, content],
  );
  return updatedNote.rows[0];
};

export const deleteNote = async (
  noteId: number,
  userId: number,
): Promise<boolean> => {
  const deletedNote = await pool.query(
    `DELETE FROM notes WHERE id = $1 AND user_id = $2`,
    [noteId, userId],
  );
  return deletedNote.rowCount !== null && deletedNote.rowCount > 0;
};
