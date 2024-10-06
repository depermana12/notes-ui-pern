"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authUtils_1 = require("../auth/authUtils");
const customError_1 = require("../error/customError");
const authorization = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        throw new customError_1.UnauthorizedError("Unauthorized access");
    }
    const [, token] = bearer.split(" ");
    if (!token) {
        throw new customError_1.UnauthorizedError("Unauthorized token");
    }
    try {
        const decodedPayload = (0, authUtils_1.verifyJWT)(token);
        req.user = decodedPayload;
        next();
    }
    catch (error) {
        console.error(error);
        next(new customError_1.UnauthorizedError("Unauthorized token"));
    }
};
exports.default = authorization;
