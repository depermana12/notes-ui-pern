import asyncHandler from "../middlewares/asyncHandler";
import * as userService from "../services/user";
import authService from "../services/authService";
import {
  loginSchema,
  resetPasswordSchema,
} from "../validations/userValidation";
import { ValidationError } from "../error/customError";

export const signIn = asyncHandler(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) throw new ValidationError(error.details[0].message);

  const token = await authService.signIn(req.body.email, req.body.password);

  res.status(200).json({ message: "Login success", data: { token } });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const userEmail = await userService.fetchUserByEmail(req.body.email);

  if (!userEmail) {
    throw new ValidationError("This email user does not found in our app");
  }

  await authService.sendResetPasswordEmail(userEmail);

  res.status(200).json({
    message: "Reset password link has been sent to your email",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, id } = req.query;

  const { error } = resetPasswordSchema.validate(req.body);
  if (error) throw new ValidationError(error.details[0].message);

  await authService.resetPassword(
    Number(id),
    token as string,
    req.body.password,
  );

  res.status(200).json({ message: "Password updated successfully" });
});
