import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "@chakra-ui/react";

import { Note } from "../types/type";

interface Props {
  note: Note;
}

const NoteCard = ({ note }: Props) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{note.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text size="sm">{note.content}</Text>
      </CardBody>
      <CardFooter>
        <Text>{new Date(note.created_at).toLocaleDateString()}</Text>
      </CardFooter>
    </Card>
  );
};
export default NoteCard;
