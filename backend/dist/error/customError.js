"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadError = exports.FileTypeError = exports.UnauthorizedError = exports.ConflictError = exports.NotFoundError = exports.ValidationError = exports.DatabaseError = exports.CustomError = void 0;
class CustomError extends Error {
    status;
    type;
    constructor(message, status, type) {
        super(message);
        this.status = status;
        this.type = type;
    }
}
exports.CustomError = CustomError;
class DatabaseError extends CustomError {
    constructor(message, status) {
        super(message, status, "DatabaseError");
    }
}
exports.DatabaseError = DatabaseError;
class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400, "ValidationError");
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404, "NotFoundError");
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409, "ConflictError");
    }
}
exports.ConflictError = ConflictError;
class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 401, "UnauthorizedError");
    }
}
exports.UnauthorizedError = UnauthorizedError;
class FileTypeError extends CustomError {
    constructor(message) {
        super(message, 400, "FileTypeError");
    }
}
exports.FileTypeError = FileTypeError;
class UploadError extends CustomError {
    constructor(message) {
        super(message, 400, "UploadError");
    }
}
exports.UploadError = UploadError;
