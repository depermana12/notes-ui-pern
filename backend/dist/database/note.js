"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.paginatedNotes = exports.countNotes = exports.getNote = exports.getNotes = exports.searchNote = void 0;
const db_1 = __importDefault(require("./db"));
const searchNote = async (term) => {
    const { rows } = await db_1.default.query(`SELECT * FROM notes WHERE notes ILIKE = $1`, [`%${term}%`]);
    return rows;
};
exports.searchNote = searchNote;
const getNotes = async () => {
    const { rows } = await db_1.default.query(`SELECT * FROM notes`);
    return rows;
};
exports.getNotes = getNotes;
const getNote = async (id) => {
    const { rows } = await db_1.default.query(`SELECT * FROM notes WHERE note_id = $1`, [id]);
    return rows[0];
};
exports.getNote = getNote;
const countNotes = async () => {
    const total = await db_1.default.query(`SELECT COUNT(*) FROM notes`);
    return total.rows[0].count;
};
exports.countNotes = countNotes;
const paginatedNotes = async (limit, offset) => {
    const { rows } = await db_1.default.query(`
    SELECT * FROM notes LIMIT $1 OFFSET $2`, [limit, offset]);
    return rows;
};
exports.paginatedNotes = paginatedNotes;
const createNote = async (title, content, userId) => {
    const newNote = await db_1.default.query(`INSERT INTO notes(title, content, user_id)VALUES($1, $2, $3) RETURNING *`, [title, content, userId]);
    return newNote.rows[0];
};
exports.createNote = createNote;
const updateNote = async (noteId, userId, title, content) => {
    const updatedNote = await db_1.default.query(`UPDATE notes SET title = $1, content = $2 WHERE note_id = $3 AND user_id = $4 RETURNING *`, [noteId, userId, title, content]);
    return updatedNote.rows[0];
};
exports.updateNote = updateNote;
const deleteNote = async (noteId, userId) => {
    const deletedNote = await db_1.default.query(`DELETE FROM notes WHERE note_id = $1 AND user_id = $2`, [noteId, userId]);
    return deletedNote.rowCount !== null && deletedNote.rowCount > 0;
};
exports.deleteNote = deleteNote;
