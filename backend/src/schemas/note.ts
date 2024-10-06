interface Note {
  note_id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}

export default Note;
