import {
  createJWT,
  createRefreshJWT,
  verifyJWT,
  hashPassword,
  comparePassword,
} from "../auth/authUtils";
import emailService from "../services/emailService";
import { RefreshToken, User } from "../schemas/user";
import {
  fetchUserById,
  fetchUserByEmail,
  modifyUserPassword,
} from "../services/user";
import { ValidationError } from "../error/customError";
import { saveRefreshToken } from "../database/user";
import * as db from "../database/user";
import expiresIn from "../utils/tokenAge";

interface SignInResponse {
  token: string;
  refreshToken: string;
  username: string;
  email: string;
}

const storeRefreshToken = async (
  userId: number,
  refreshToken: string,
  expiresIn: Date,
) => {
  const storedRefreshToken = await saveRefreshToken(
    refreshToken,
    userId,
    expiresIn,
  );
  return storedRefreshToken;
};

interface RefreshTokenResponse {
  newRefreshToken: string;
  newAccessToken: string;
}

const emptyRefreshToken = async (token: string): Promise<boolean> => {
  const payload = verifyJWT(token, process.env.JWT_REFRESH_SECRET as string);
  return await db.deleteRefreshToken(payload.id);
};

const updateRefreshToken = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  const decodedPayload = verifyJWT(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
  );

  const oldRefreshToken = await db.findRefreshToken(decodedPayload.id);

  if (!oldRefreshToken) {
    throw new ValidationError("Refresh token not found, please login again");
  }

  const currentDate = new Date();
  const refreshTokenExpiredDate = new Date(oldRefreshToken.expires_at);

  if (refreshTokenExpiredDate <= currentDate) {
    throw new ValidationError("Refresh token has expired");
  }

  const user = await fetchUserById(decodedPayload.id);

  if (!user) {
    throw new ValidationError("User not found for the refresh token");
  }

  const newRefreshToken = createRefreshJWT(user);
  await db.renewRefreshToken(user.id, newRefreshToken, expiresIn.date());

  const newAccessToken = createJWT(user);

  return { newRefreshToken, newAccessToken };
};

const signIn = async (
  email: string,
  password: string,
): Promise<SignInResponse> => {
  const user = await fetchUserByEmail(email);

  if (!user || !(await comparePassword(password, user.password))) {
    throw new ValidationError("Invalid email or password");
  }

  const token = createJWT(user);
  const refreshTokenExist = await db.findRefreshToken(user.id);

  let newRefreshToken: string;

  if (!refreshTokenExist) {
    newRefreshToken = createRefreshJWT(user);
    await storeRefreshToken(user.id, newRefreshToken, expiresIn.date());
  }

  newRefreshToken = createRefreshJWT(user);

  const renewedToken = await db.renewRefreshToken(
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
  storeRefreshToken,
  updateRefreshToken,
  emptyRefreshToken,
};
