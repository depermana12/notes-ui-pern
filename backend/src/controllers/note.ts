import * as noteService from "../services/note";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";

export const getNotesByPagination = asyncHandler(async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  const { notes, notesTotal, pagination } = await noteService.getPaginatedNotes(
    page,
    limit,
  );
  res.status(200).json({
    message: "success",
    data: {
      notes,
      notesTotal,
      pagination,
    },
  });
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await noteService.getAllNotes();
  res.status(200).json({
    message: "success",
    data: {
      notes,
    },
  });
});

export const getNoteById = asyncHandler(async (req, res) => {
  const noteId = Number(req.params.id);
  const note = await noteService.findNoteById(noteId);
  res.status(200).json({
    message: "success",
    data: {
      notes: note,
    },
  });
});

export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const userId = Number(req.user.id);

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

export const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const noteId = Number(req.params.id);
  const userId = Number(req.user.id);

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

export const deleteNote = asyncHandler(async (req, res) => {
  const noteId = Number(req.params.id);
  const userId = Number(req.user.id);

  if (!userId) {
    throw new Error("User not found");
  }

  const note = await noteService.removeNote(noteId, userId);
  res.status(200).json({
    message: "success",
    deleted: note,
  });
});

export const searchNote = asyncHandler(async (req, res) => {
  const { term } = req.query;
  const notes = await noteService.searchNote(String(term));
  res.status(200).json({
    message: "success",
    data: {
      notes,
    },
  });
});
