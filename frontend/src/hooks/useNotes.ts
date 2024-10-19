import { useQuery } from "@tanstack/react-query";
import noteService from "../services/note";
import { FetchApiResponse, Pagination } from "../types/type";

const useNotes = () => {
  return useQuery<FetchApiResponse<Pagination>>({
    queryKey: ["notes"],
    queryFn: noteService.getAll,
  });
};

export default useNotes;
