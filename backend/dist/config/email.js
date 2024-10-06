"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};
exports.default = config;
