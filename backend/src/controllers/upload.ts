import uploadService from "../services/upload";
import asyncHandler from "../middlewares/asyncHandler";
import { UploadError } from "../error/customError";

const uploadAvatar = asyncHandler(async (req, res) => {
  const { file } = req;
  if (!file) throw new UploadError("No file");

  const userId = req.user.id;
  const result = await uploadService.upload(file, userId);
  console.log(result);

  res.status(200).json({ message: "Upload is good", data: { result } });
});

export default { uploadAvatar };
