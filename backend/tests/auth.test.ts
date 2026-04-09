import request from "supertest";
import app from "../src/app";
import AuthModel from "../src/models/auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

(AuthModel as any).findOne = jest.fn().mockResolvedValue({
  _id: "123",
  fullname: "Test User",
  email: "test@test.com",
  password: "hashedPassword",
  mobile: "1234567890",
  image: "img.png"
});

(bcrypt.compare as jest.Mock).mockResolvedValue(true);

(jwt.sign as jest.Mock).mockReturnValue("mockAccessToken");

jest.mock("../src/models/auth.model");
jest.mock("../src/models/auth.model");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");


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

  it("should login user successfully", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "test@test.com",
          password: "123456"
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Login Success 🎉");

      expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should fail if user not found", async () => {
    (AuthModel as any).findOne = jest.fn().mockResolvedValue(null);

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "wrong@test.com",
        password: "123456"
      });

    expect(res.status).toBe(404);
  });

  it("should fail if password is incorrect", async () => {
    (AuthModel as any).findOne = jest.fn().mockResolvedValue({
      _id: "123",
      email: "test@test.com",
      password: "hashedPassword"
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@test.com",
        password: "wrongpassword"
      });

    expect(res.status).toBe(401);
  });
});

