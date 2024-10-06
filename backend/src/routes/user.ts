import { Router } from "express";
import { getAllUser } from "../controllers/user";
import uploadController from "../controllers/upload";
import { HandleAvatarUpload } from "../middlewares/uploadHandler";

const router = Router();

router.route("/").get(getAllUser);
router.post("/upload", HandleAvatarUpload, uploadController.uploadAvatar);

export default router;
