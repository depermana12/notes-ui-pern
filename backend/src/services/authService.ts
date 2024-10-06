import {
  createJWT,
  verifyJWT,
  hashPassword,
  comparePassword,
} from "../auth/authUtils";
import emailService from "../services/emailService";
import { User } from "../schemas/user";
import {
  fetchUserById,
  fetchUserByEmail,
  modifyUserPassword,
} from "../services/user";
import { ValidationError } from "../error/customError";

const signIn = async (email: string, password: string): Promise<string> => {
  const user = await fetchUserByEmail(email);

  if (!user || !(await comparePassword(password, user.password))) {
    throw new ValidationError("Invalid email or password");
  }

  const { user_id, username } = user;
  const token = createJWT({ user_id, username });
  return token;
};

const sendResetPasswordEmail = async (user: User): Promise<void> => {
  const { user_id, username, email } = user;
  const token = createJWT({ user_id, username }, { expiresIn: "10m" });

  await emailService.sendResetPasswordEmail(email, token, user_id);
};

const resetPassword = async (
  userId: number,
  token: string,
  newPassword: string,
): Promise<void> => {
  const user = await fetchUserById(Number(userId));

  if (!user) {
    throw new ValidationError("User not found");
  }

  const decodedPayload = verifyJWT(token);

  if (decodedPayload.user_id !== user.user_id) {
    throw new ValidationError("Invalid token mismatch");
  }

  const hashedPassword = await hashPassword(newPassword);

  await modifyUserPassword(hashedPassword, user.user_id);
};

export default { signIn, sendResetPasswordEmail, resetPassword };
