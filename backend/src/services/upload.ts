import path from "path";
import db from "../database/upload";
import { UploadError } from "../error/customError";
import Avatar from "../schemas/avatar";

const upload = async (
  file: Express.Multer.File,
  userId: number,
): Promise<Avatar> => {
  try {
    // TODO: alter table users_photo schema to include file path
    // TODO: alter created_at to uploaded_at
    const uploadedFile = await db.upload(file.filename, userId);
    if (!uploadedFile) throw new UploadError("Failed to upload file");

    return uploadedFile;
  } catch (error) {
    throw new UploadError("Error uploading file");
  }
};

export default { upload };
