"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "notes",
    password: process.env.DB_PASSWORD || "notesapp",
    port: Number(process.env.DB_PORT) || 5432,
};
exports.default = config;
