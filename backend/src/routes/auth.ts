import { Router } from "express";
import { createUser } from "../controllers/user";
import { signIn, signOut } from "../controllers/auth";
import { forgotPassword, resetPassword } from "../controllers/auth";
import refreshToken from "../controllers/refreshToken";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.get("/refresh", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
