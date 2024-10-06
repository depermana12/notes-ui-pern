import multer from "multer";
import multerConfig from "../config/multer";

const upload = multer({
  storage: multerConfig.storage,
  fileFilter: (req, file, cb) => {
    multerConfig.filterFileTypes(req, file, cb);
  },
  limits: multerConfig.limits,
});

export const HandleAvatarUpload = upload.single("avatar");
