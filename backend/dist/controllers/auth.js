"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const userService = __importStar(require("../services/user"));
const authUtils = __importStar(require("../auth/authUtils"));
const userValidation_1 = require("../validations/userValidation");
const customError_1 = require("../error/customError");
exports.signIn = (0, asyncHandler_1.default)(async (req, res) => {
    const { error } = userValidation_1.loginSchema.validate(req.body);
    if (error)
        throw new customError_1.ValidationError(error.details[0].message);
    const { email, password } = req.body;
    const user = await userService.fetchUserByEmail(email);
    if (!user || !(await authUtils.comparePassword(password, user.password))) {
        throw new customError_1.ValidationError("Invalid email or password");
    }
    const token = authUtils.createJWT(user);
    res.status(200).json({ message: "Login success", data: { token } });
});
