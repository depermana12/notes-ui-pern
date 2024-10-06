"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.comparePassword = exports.verifyJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customError_1 = require("../error/customError");
const createJWT = (user, option = {}) => {
    const token = jsonwebtoken_1.default.sign({
        user_id: user.user_id,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: option.expiresIn || "7d" });
    return token;
};
exports.createJWT = createJWT;
const verifyJWT = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new customError_1.UnauthorizedError("Token expired");
        }
        throw new customError_1.UnauthorizedError("Invalid token");
    }
};
exports.verifyJWT = verifyJWT;
const comparePassword = async (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const hashPassword = async (password) => {
    return bcrypt_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
