"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_1 = require("../controllers/note");
const router = (0, express_1.Router)();
router.route("/").get(note_1.getNotesByPagination).post(note_1.createNote);
router.route("/:id").get(note_1.getNoteById).patch(note_1.updateNote).delete(note_1.deleteNote);
router.route("/search").get(note_1.searchNote);
exports.default = router;
