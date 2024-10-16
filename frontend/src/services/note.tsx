import ApiService from "./api";
import { Note } from "../types/type";

const noteService = new ApiService<Note>("/notes");
export default noteService;
