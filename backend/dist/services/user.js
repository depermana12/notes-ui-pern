"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = exports.fetchUserByUsername = exports.fetchUserByEmail = exports.fetchUserById = exports.fetchAllUser = void 0;
const db = __importStar(require("../database/user"));
const fetchAllUser = async () => {
    return await db.findAllUsers();
};
exports.fetchAllUser = fetchAllUser;
const fetchUserById = async (id) => {
    return await db.findUserBy("user_id", id);
};
exports.fetchUserById = fetchUserById;
const fetchUserByEmail = async (email) => {
    return await db.findUserBy("email", email);
};
exports.fetchUserByEmail = fetchUserByEmail;
const fetchUserByUsername = async (username) => {
    return await db.findUserBy("username", username);
};
exports.fetchUserByUsername = fetchUserByUsername;
const saveUser = async (username, email, password) => {
    const newUser = await db.createUser(username, email, password);
    return newUser;
};
exports.saveUser = saveUser;
