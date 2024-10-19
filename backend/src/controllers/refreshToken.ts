import { Request, Response } from "express";
import authService from "../services/authService";
import { UnauthorizedError } from "../error/customError";
import expiresIn from "../utils/tokenAge";
import asyncHandler from "../middlewares/asyncHandler";

const refreshToken = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;
    if (!cookies) {
      throw new UnauthorizedError("Unauthorized access no cookies");
    }

    const refreshJWT = cookies.noteapp_refreshToken;

    if (!refreshJWT) {
      throw new UnauthorizedError(
        "Unauthorized access no refresh token, please login",
      );
    }

    const { newAccessToken, newRefreshToken } =
      await authService.updateRefreshToken(refreshJWT);

    res.cookie("noteapp_refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expiresIn.milliesecond(),
    });

    res.status(201).json({ token: newAccessToken });
  },
);

export default refreshToken;
