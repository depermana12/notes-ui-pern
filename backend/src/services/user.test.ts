import { fetchUserById } from "./user";
import pool from "../database/db";

afterAll(() => {
  pool.end();
});

describe("get user by field", () => {
  it("should return user by id", async () => {
    const user = await fetchUserById(10);
    expect(user!.user_id).toEqual(10);
  });

  it("shuld throw error 404 if id not found", async () => {
    try {
      await fetchUserById(69); //nice
    } catch (error: any) {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual("User id not found");
    }
  });
});
