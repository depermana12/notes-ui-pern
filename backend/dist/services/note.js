"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNote = exports.removeNote = exports.modifyNote = exports.saveNote = exports.findNoteById = exports.getPaginatedNotes = void 0;
const db = __importStar(require("../database/note"));
const customError_1 = require("../error/customError");
const getPaginatedNotes = async (page, limit) => {
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
exports.getPaginatedNotes = getPaginatedNotes;
const findNoteById = async (noteId) => {
    const note = await db.getNote(noteId);
    if (!note)
        throw new customError_1.DatabaseError("Note not found", 404);
    return note;
};
exports.findNoteById = findNoteById;
const saveNote = async (title, content, noteId) => {
    return await db.createNote(title, content, noteId);
};
exports.saveNote = saveNote;
const modifyNote = async (noteId, userId, title, content) => {
    const updatedNote = await db.updateNote(noteId, userId, title, content);
    if (!updatedNote)
        throw new customError_1.DatabaseError("Cannot update note, note not found", 404);
    return updatedNote;
};
exports.modifyNote = modifyNote;
const removeNote = async (noteId, userId) => {
    const note = await db.deleteNote(noteId, userId);
    if (!note)
        throw new customError_1.DatabaseError("Cannot delete note, note not found", 404);
    return note;
};
exports.removeNote = removeNote;
const searchNote = async (term) => {
    const notes = await db.searchNote(term);
    if (!notes)
        throw new customError_1.DatabaseError("Search term not found", 404);
    return notes;
};
exports.searchNote = searchNote;
