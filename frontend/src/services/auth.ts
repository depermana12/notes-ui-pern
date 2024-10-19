import ApiService from "./api";
import { SignUpResponse } from "../types/type";

export const signUp = new ApiService<SignUpResponse>("/auth/signup");
export const signIn = new ApiService<SignUpResponse>("/auth/signin");

export default {
  signUp,
  signIn,
};
