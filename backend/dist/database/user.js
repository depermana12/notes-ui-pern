"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserBy = exports.createUser = exports.findUserBy = exports.findAllUsers = void 0;
const db_1 = __importDefault(require("./db"));
const findAllUsers = async () => {
    const { rows } = await db_1.default.query(`SELECT user_id, username, email, created_at
       FROM users`);
    return rows;
};
exports.findAllUsers = findAllUsers;
const findUserBy = async (field, value) => {
    const { rows } = await db_1.default.query(`SELECT * 
       FROM users
     WHERE ${field} = $1`, [value]);
    return rows[0];
};
exports.findUserBy = findUserBy;
const createUser = async (username, email, password) => {
    const { rows } = await db_1.default.query(`INSERT INTO users(username, email, password)
       VALUES($1, $2, $3) RETURNING *`, [username, email, password]);
    return rows[0];
};
exports.createUser = createUser;
const updateUserBy = async (field, value, id) => {
    const { rows } = await db_1.default.query(`UPDATE users
       SET ${field} = $1
     WHERE user_id = $2 RETURNING *`, [value, id]);
    return rows[0];
};
exports.updateUserBy = updateUserBy;
const deleteUser = async (id) => {
    const result = await db_1.default.query(`DELETE FROM users WHERE user_id = $1`, [id]);
    return result.rowCount !== null && result.rowCount > 0;
};
exports.deleteUser = deleteUser;
