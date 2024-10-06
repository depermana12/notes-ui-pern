import Note from "../schemas/note";
interface PaginationProps {
    currentPage: number;
    totalPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}
interface Pagination {
    notes: Note[];
    notesTotal: number;
    pagination: PaginationProps;
}
export declare const getPaginatedNotes: (page: number, limit: number) => Promise<Pagination>;
export declare const findNoteById: (noteId: number) => Promise<Note>;
export declare const saveNote: (title: string, content: string, noteId: number) => Promise<Note>;
export declare const modifyNote: (noteId: number, userId: number, title: string, content: string) => Promise<Note>;
export declare const removeNote: (noteId: number, userId: number) => Promise<boolean>;
export declare const searchNote: (term: string) => Promise<Note[]>;
export {};
