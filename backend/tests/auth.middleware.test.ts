import AuthMiddleware from "../src/middleware/auth.middleware";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      cookies: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("should pass with valid token", async () => {
    req.cookies.accessToken = "validToken";

    (jwt.verify as jest.Mock).mockReturnValue({
      id: "123",
      fullname: "Test User",
      email: "test@test.com",
      mobile: "1234567890",
      image: "img.png"
    });

    await AuthMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.session).toBeDefined();
    expect(req.session.email).toBe("test@test.com");
  });

  it("should fail without token", async () => {
    await AuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});