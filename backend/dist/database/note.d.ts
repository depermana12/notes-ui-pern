import Note from "../schemas/note";
export declare const searchNote: (term: string) => Promise<Note[] | null>;
export declare const getNotes: () => Promise<Note[]>;
export declare const getNote: (id: number) => Promise<Note>;
export declare const countNotes: () => Promise<number>;
export declare const paginatedNotes: (limit: number, offset: number) => Promise<Note[]>;
export declare const createNote: (title: string, content: string, userId: number) => Promise<Note>;
export declare const updateNote: (noteId: number, userId: number, title: string, content: string) => Promise<Note>;
export declare const deleteNote: (noteId: number, userId: number) => Promise<boolean>;
