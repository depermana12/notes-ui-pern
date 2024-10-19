import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { UserData, AuthContextType } from "../../types/authType";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const handleAuth = (user: UserData, token: string) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    localStorage.setItem("token", token);
  };

  const registerUser = (user: UserData, token: string) => {
    handleAuth(user, token);
  };

  const login = (user: UserData, token: string) => {
    handleAuth(user, token);
  };

  const authenticated = () => !!user;

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const contextData: AuthContextType = {
    authenticated,
    user,
    registerUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
