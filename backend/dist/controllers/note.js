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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNote = exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getNotesByPagination = void 0;
const noteService = __importStar(require("../services/note"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
exports.getNotesByPagination = (0, asyncHandler_1.default)(async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    const { notes, notesTotal, pagination } = await noteService.getPaginatedNotes(page, limit);
    res.status(200).json({
        message: "success",
        data: {
            notes,
            notesTotal,
            pagination,
        },
    });
});
exports.getNoteById = (0, asyncHandler_1.default)(async (req, res) => {
    const noteId = Number(req.params.id);
    const note = await noteService.findNoteById(noteId);
    res.status(200).json({
        message: "success",
        data: {
            notes: note,
        },
    });
});
exports.createNote = (0, asyncHandler_1.default)(async (req, res) => {
    const { title, content } = req.body;
    const userId = Number(req.user.user_id);
    if (!userId) {
        throw new Error("User not found");
    }
    const newNote = await noteService.saveNote(title, content, userId);
    res.status(201).json({
        message: "success create note",
        data: {
            notes: newNote,
        },
    });
});
exports.updateNote = (0, asyncHandler_1.default)(async (req, res) => {
    const { title, content } = req.body;
    const noteId = Number(req.params.id);
    const userId = Number(req.user.user_id);
    if (!userId) {
        throw new Error("User not found");
    }
    const note = await noteService.modifyNote(noteId, userId, title, content);
    res.status(200).json({
        message: "success update note",
        data: {
            notes: note,
        },
    });
});
exports.deleteNote = (0, asyncHandler_1.default)(async (req, res) => {
    const noteId = Number(req.params.id);
    const userId = Number(req.user.user_id);
    if (!userId) {
        throw new Error("User not found");
    }
    const note = await noteService.removeNote(noteId, userId);
    res.status(200).json({
        message: "success",
        deleted: note,
    });
});
exports.searchNote = (0, asyncHandler_1.default)(async (req, res) => {
    const { term } = req.query;
    const notes = await noteService.searchNote(String(term));
    res.status(200).json({
        message: "success",
        data: {
            notes,
        },
    });
});
