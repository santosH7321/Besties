import RefreshToken from "../src/middleware/refresh.middleware";
import AuthModel from "../src/models/auth.model";

jest.mock("../src/models/auth.model");

describe("Refresh Middleware", () => {
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

  it("should pass with valid refresh token", async () => {
    req.cookies.refreshToken = "validToken";

    (AuthModel as any).findOne = jest.fn().mockResolvedValue({
      _id: "123",
      fullname: "Test User",
      email: "test@test.com",
      mobile: "1234567890",
      image: null,
      expiry: new Date(Date.now() + 1000000),
    });

    await RefreshToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.session).toBeDefined();
    expect(req.session.email).toBe("test@test.com");
  });

  it("should fail if no refresh token", async () => {
    await RefreshToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should fail if user not found", async () => {
    req.cookies.refreshToken = "invalidToken";

    (AuthModel as any).findOne = jest.fn().mockResolvedValue(null);

    await RefreshToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should fail if token is expired", async () => {
    req.cookies.refreshToken = "expiredToken";

    (AuthModel as any).findOne = jest.fn().mockResolvedValue({
      _id: "123",
      expiry: new Date(Date.now() - 1000000),
    });

    await RefreshToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});