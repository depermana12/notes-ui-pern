import bycrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bycrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string): Promise<string> => {
  return bycrypt.hash(password, 10);
};
