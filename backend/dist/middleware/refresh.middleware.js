"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const auth_model_1 = __importDefault(require("../models/auth.model"));
const moment_1 = __importDefault(require("moment"));
const RefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            throw (0, error_1.TryError)("Faield to refresh token", 401);
        const user = await auth_model_1.default.findOne({ refreshToken });
        if (!user)
            throw (0, error_1.TryError)("Faield to refresh token", 401);
        const today = (0, moment_1.default)();
        const expiry = (0, moment_1.default)(user.expiry);
        const isExpired = today.isAfter(expiry);
        if (isExpired)
            throw (0, error_1.TryError)("Faield to refresh token", 401);
        req.session = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            image: user.image ?? null
        };
        next();
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to refresh Token");
    }
};
exports.default = RefreshToken;
