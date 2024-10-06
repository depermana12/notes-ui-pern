import multer from "multer";
import path from "node:path";
import { FileTypeError } from "../error/customError";
import { Request } from "express";

const publicDir = path.resolve(__dirname, "../public");

const storage = multer.diskStorage({
  destination: (req, file, cb): void => {
    cb(null, path.join(publicDir, "/uploads/users"));
  },
  filename: (req, file, cb): void => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const filterFileTypes = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
): void => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const alllowedExt = [".jpeg", ".jpg", ".png"];
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (
    allowedFileTypes.includes(file.mimetype) &&
    alllowedExt.includes(fileExt)
  ) {
    cb(null, true);
  } else {
    cb(new FileTypeError("File type not allowed"));
  }
};

export const limits = {
  fileSize: 1024 * 1024 * 5, // 5MB
  files: 1,
};

export default {
  storage,
  filterFileTypes,
  limits,
};
