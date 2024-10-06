import { Router } from "express";
import { createUser } from "../controllers/user";
import { signIn } from "../controllers/auth";
import { forgotPassword, resetPassword } from "../controllers/auth";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
