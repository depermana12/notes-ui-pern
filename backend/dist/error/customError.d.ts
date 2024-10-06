export declare class CustomError extends Error {
    status: number;
    type: string;
    constructor(message: string, status: number, type: string);
}
export declare class DatabaseError extends CustomError {
    constructor(message: string, status: number);
}
export declare class ValidationError extends CustomError {
    constructor(message: string);
}
export declare class NotFoundError extends CustomError {
    constructor(message: string);
}
export declare class ConflictError extends CustomError {
    constructor(message: string);
}
export declare class UnauthorizedError extends CustomError {
    constructor(message: string);
}
export declare class FileTypeError extends CustomError {
    constructor(message: string);
}
export declare class UploadError extends CustomError {
    constructor(message: string);
}
