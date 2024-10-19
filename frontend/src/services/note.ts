import ApiService from "./api";
import { Pagination } from "../types/type";

const noteService = new ApiService<Pagination>("/notes");
export default noteService;
