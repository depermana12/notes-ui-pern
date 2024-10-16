import ApiService from "./api";
import { User } from "../types/type";

const authService = new ApiService<User>("/auth/signup");

export default authService;
