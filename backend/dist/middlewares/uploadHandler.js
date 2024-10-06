"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const customError_1 = require("../error/customError");
const publicDir = node_path_1.default.resolve(__dirname, "../public");
console.log(publicDir);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, node_path_1.default.join(publicDir, "/uploads/users"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        filterFileTypes(req, file, cb);
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
        files: 1,
    },
});
const filterFileTypes = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const alllowedExt = [".jpeg", ".jpg", ".png"];
    const fileExt = node_path_1.default.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(file.mimetype) &&
        alllowedExt.includes(fileExt)) {
        cb(null, true);
    }
    else {
        cb(new customError_1.FileTypeError("File type not allowed"));
    }
};
