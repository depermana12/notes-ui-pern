export interface Note {
  note_id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Pagination {
  notes: Note[];
  notesTotal: number;
  pagination: PaginationProps;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface SignUpResponse {
  username: string;
  email: string;
  token: string;
}

export interface FetchApiResponse<T> {
  message: string;
  data: T;
}
