import { SimpleGrid } from "@chakra-ui/react";
import useNotes from "../hooks/useNotes";
import NoteCard from "./NoteCard";

const NoteCardGrid = () => {
  const { data, error } = useNotes();

  const notes = data?.data.notes || [];

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      <SimpleGrid spacing="4" columns={4}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </SimpleGrid>
    </>
  );
};
export default NoteCardGrid;
