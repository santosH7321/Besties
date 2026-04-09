import request from "supertest";
import app from "../src/app";

jest.mock("../src/models/auth.model");


describe("Auth Routes", () => {
  it("should test signup route", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({
        fullname: "Test User",
        email: "test@test.com",
        password: "123456",
        mobile: "1234567890"
      });

    expect(res.body.message).toBe("Signup Success ✅");
  });
});