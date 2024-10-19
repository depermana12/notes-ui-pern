export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface RefreshToken {
  id: number;
  token: string;
  expires_at: number;
}
