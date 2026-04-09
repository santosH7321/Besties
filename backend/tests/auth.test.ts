import request from "supertest";
import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test working" });
});

describe("Basic Test", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/test");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Test working");
  });
});