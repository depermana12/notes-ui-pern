"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/signup", user_1.createUser);
router.post("/signin", auth_1.signIn);
exports.default = router;
