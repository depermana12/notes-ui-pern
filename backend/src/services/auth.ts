import { createJWT, createRefreshJWT, verifyJWT } from "../auth/authUtils";
import { hashPassword, comparePassword } from "../auth/passwordUtils";
import emailService from "./emailService";
import { User } from "../schemas/user";
import { fetchUserById, fetchUserByEmail, modifyUserPassword } from "./user";
import { ValidationError } from "../error/customError";
import { renewRefreshTokenInDB } from "../database/refreshToken";
import { findRefreshTokenInDB } from "../database/refreshToken";
import expiresIn from "../utils/tokenAge";
import { storeRefreshToken } from "./refreshToken";

interface SignInResponse {
  token: string;
  refreshToken: string;
  username: string;
  email: string;
}

const signIn = async (
  email: string,
  password: string,
): Promise<SignInResponse> => {
  const user = await fetchUserByEmail(email);

  if (!user || !(await comparePassword(password, user.password))) {
    throw new ValidationError("Invalid email or password");
  }

  const token = createJWT(user);
  const refreshTokenExist = await findRefreshTokenInDB(user.id);

  let newRefreshToken: string;

  if (!refreshTokenExist) {
    newRefreshToken = createRefreshJWT(user);
    await storeRefreshToken(user.id, newRefreshToken, expiresIn.date());
  }

  newRefreshToken = createRefreshJWT(user);

  const renewedToken = await renewRefreshTokenInDB(
    user.id,
    newRefreshToken,
    expiresIn.date(),
  );
  newRefreshToken = renewedToken.token;

  return {
    token,
    refreshToken: newRefreshToken,
    username: user.username,
    email: user.email,
  };
};

const sendResetPasswordEmail = async (user: User): Promise<void> => {
  const { id, username, email } = user;
  const token = createJWT({ id, username }, { expiresIn: "10m" });

  await emailService.sendResetPasswordEmail(email, token, id);
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

  if (decodedPayload.id !== user.id) {
    throw new ValidationError("Invalid token mismatch");
  }

  const hashedPassword = await hashPassword(newPassword);

  await modifyUserPassword(hashedPassword, user.id);
};

export default {
  signIn,
  sendResetPasswordEmail,
  resetPassword,
};
