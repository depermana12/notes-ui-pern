export interface UserData {
  username: string;
  email: string;
  token?: string;
}

export interface AuthContextType {
  authenticated: () => boolean;
  user: UserData | null;
  registerUser: (user: UserData, token: string) => void;
  login: (user: UserData, token: string) => void;
  logout: () => void;
}
