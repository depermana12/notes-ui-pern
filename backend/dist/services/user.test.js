"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const db_1 = __importDefault(require("../database/db"));
afterAll(() => {
    db_1.default.end();
});
describe("get user by field", () => {
    it("should return user by id", async () => {
        const user = await (0, user_1.fetchUserById)(10);
        expect(user.user_id).toEqual(10);
    });
    it("shuld throw error 404 if id not found", async () => {
        try {
            await (0, user_1.fetchUserById)(69); //nice
        }
        catch (error) {
            expect(error.status).toEqual(404);
            expect(error.message).toEqual("User id not found");
        }
    });
});
