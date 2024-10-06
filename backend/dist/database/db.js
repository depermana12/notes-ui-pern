"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const db_1 = __importDefault(require("../config/db"));
const { Pool } = pg_1.default;
const pool = new Pool(db_1.default);
exports.default = pool;
