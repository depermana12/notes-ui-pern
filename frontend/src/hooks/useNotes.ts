import { useQuery } from "@tanstack/react-query";
import noteService from "../services/note";
import { FetchApiResponse, Note } from "../types/type";

const useNotes = () => {
  return useQuery<FetchApiResponse<Note>>({
    queryKey: ["notes"],
    queryFn: noteService.getAll,
  });
};

export default useNotes;
