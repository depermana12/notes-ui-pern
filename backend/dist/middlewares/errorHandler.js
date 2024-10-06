"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const dev = process.env.NODE_ENV == "development";
    const errorMessage = dev
        ? { error: err.message, type: err.type }
        : `Something went wrong: ${err.type}`;
    const stackTrace = dev ? err.stack : null;
    res
        .status(err.status || 500)
        .json({ message: errorMessage, stack: stackTrace });
};
exports.default = globalErrorHandler;
