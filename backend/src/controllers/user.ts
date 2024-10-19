import * as userService from "../services/user";
import asyncHandler from "../middlewares/asyncHandler";
import { registerSchema } from "../validations/userValidation";
import { ValidationError } from "../error/customError";
import expiresIn from "../utils/tokenAge";

export const createUser = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) throw new ValidationError(error.details[0].message);

  const { username, email, password } = req.body;

  const {
    token: accessToken,
    refreshToken,
    username: newUsername,
    email: newEmail,
    cookieConfig,
  } = await userService.saveUser(username, email, password);

  res.cookie("refreshToken", refreshToken, {
    ...cookieConfig,
    sameSite: "strict",
  });

  res.status(201).json({
    message: "user created",
    data: { username: newUsername, email: newEmail, token: accessToken },
  });
});

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await userService.fetchAllUser();
  res.status(200).json({ message: "success", data: { users } });
});
