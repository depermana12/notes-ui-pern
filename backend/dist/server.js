"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
process.on("uncaughtException", (err) => {
    // TODO: log error to winston
    console.error("Uncaught Exception: ", err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    // TODO: log error to winston
    console.error("Unhandled Rejection: ", err);
    process.exit(1);
});
const server = app_1.default.listen(process.env.PORT || 3000);
console.log(`Server good to go`);
