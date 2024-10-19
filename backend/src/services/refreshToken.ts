import { createJWT, createRefreshJWT, verifyJWT } from "../auth/authUtils";
import {
  deleteRefreshTokenFromDB,
  findRefreshTokenInDB,
  renewRefreshTokenInDB,
  saveRefreshTokenToDB,
} from "../database/refreshToken";
import { ValidationError } from "../error/customError";
import expiresIn from "../utils/tokenAge";
import { fetchUserById } from "./user";

interface RefreshTokenResponse {
  newRefreshToken: string;
  newAccessToken: string;
}

export const storeRefreshToken = async (
  userId: number,
  refreshToken: string,
  expiresIn: Date,
) => {
  const storedRefreshToken = await saveRefreshTokenToDB(
    refreshToken,
    userId,
    expiresIn,
  );
  return storedRefreshToken;
};

export const emptyRefreshToken = async (token: string): Promise<boolean> => {
  const payload = verifyJWT(token, process.env.JWT_REFRESH_SECRET as string);
  return await deleteRefreshTokenFromDB(payload.id);
};

export const updateRefreshToken = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  const decodedPayload = verifyJWT(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
  );

  const oldRefreshToken = await findRefreshTokenInDB(decodedPayload.id);

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
  await renewRefreshTokenInDB(user.id, newRefreshToken, expiresIn.date());

  const newAccessToken = createJWT(user);

  return { newRefreshToken, newAccessToken };
};
