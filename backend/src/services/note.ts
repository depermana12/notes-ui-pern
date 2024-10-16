import * as db from "../database/note";
import { DatabaseError } from "../error/customError";
import Note from "../schemas/note";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface Pagination {
  notes: Note[];
  notesTotal: number;
  pagination: PaginationProps;
}

export const getPaginatedNotes = async (
  page: number,
  limit: number,
): Promise<Pagination> => {
  const offset = (page - 1) * limit;
  const notesTotal = await db.countNotes();

  const notes = await db.paginatedNotes(limit, offset);
  const totalPage = Math.ceil(notesTotal / limit);

  const hasNext = page < totalPage;
  const hasPrev = page > 1;

  return {
    notes,
    notesTotal,
    pagination: { currentPage: page, totalPage, hasNext, hasPrev },
  };
};

export const getAllNotes = async (): Promise<Note[]> => {
  return await db.getNotes();
};

export const findNoteById = async (noteId: number): Promise<Note> => {
  const note = await db.getNote(noteId);
  if (!note) throw new DatabaseError("Note not found", 404);

  return note;
};

export const saveNote = async (
  title: string,
  content: string,
  noteId: number,
): Promise<Note> => {
  return await db.createNote(title, content, noteId);
};

export const modifyNote = async (
  noteId: number,
  userId: number,
  title: string,
  content: string,
): Promise<Note> => {
  const updatedNote = await db.updateNote(noteId, userId, title, content);
  if (!updatedNote)
    throw new DatabaseError("Cannot update note, note not found", 404);

  return updatedNote;
};

export const removeNote = async (
  noteId: number,
  userId: number,
): Promise<boolean> => {
  const note = await db.deleteNote(noteId, userId);
  if (!note) throw new DatabaseError("Cannot delete note, note not found", 404);

  return note;
};

export const searchNote = async (term: string): Promise<Note[]> => {
  const notes = await db.searchNote(term);
  if (!notes) throw new DatabaseError("Search term not found", 404);
  return notes;
};
