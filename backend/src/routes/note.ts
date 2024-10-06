import { Router } from "express";
import {
  deleteNote,
  getNoteById,
  getNotesByPagination,
  updateNote,
  searchNote,
  createNote,
} from "../controllers/note";

const router = Router();

router.route("/").get(getNotesByPagination).post(createNote);
router.route("/:id").get(getNoteById).patch(updateNote).delete(deleteNote);
router.route("/search").get(searchNote);

export default router;
