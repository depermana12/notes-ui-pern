export class CustomError extends Error {
  status: number;
  type: string;

  constructor(message: string, status: number, type: string) {
    super(message);
    this.status = status;
    this.type = type;
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string, status: number) {
    super(message, status, "DatabaseError");
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400, "ValidationError");
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404, "NotFoundError");
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409, "ConflictError");
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401, "UnauthorizedError");
  }
}

export class FileTypeError extends CustomError {
  constructor(message: string) {
    super(message, 400, "FileTypeError");
  }
}

export class UploadError extends CustomError {
  constructor(message: string) {
    super(message, 400, "UploadError");
  }
}
