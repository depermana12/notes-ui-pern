import * as userService from "../services/user";
import asyncHandler from "../middlewares/asyncHandler";
import { registerSchema } from "../validations/userValidation";
import { ValidationError } from "../error/customError";

export const createUser = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) throw new ValidationError(error.details[0].message);

  const { username, email, password } = req.body;

  const newUserToken = await userService.saveUser(username, email, password);

  res.cookie("noteapp_authn", newUserToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res
    .status(201)
    .json({ message: "user created", data: { token: newUserToken } });
});

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await userService.fetchAllUser();
  res.status(200).json({ message: "success", data: { users } });
});
