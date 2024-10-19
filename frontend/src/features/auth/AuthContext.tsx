import { createContext } from "react";
import { AuthContextType } from "../../types/authType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
