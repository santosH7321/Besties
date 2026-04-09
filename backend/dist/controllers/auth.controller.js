"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.updateProfilePicture = exports.getSession = exports.refreshToken = exports.login = exports.signup = void 0;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const accessTokenExpiry = '10m';
const tenMinuteInMs = (10 * 60) * 1000;
const sevenDayInMs = (7 * 24 * 60 * 60) * 1000;
const generateToken = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_SECRET, { expiresIn: accessTokenExpiry });
    const refreshToken = (0, uuid_1.v4)();
    return {
        accessToken,
        refreshToken
    };
};
const getOptions = (tokenType) => {
    return {
        httpOnly: true,
        maxAge: tokenType === "at" ? tenMinuteInMs : sevenDayInMs,
        secure: false,
    };
};
const signup = async (req, res) => {
    try {
        await auth_model_1.default.create(req.body);
        res.json({ message: "Signup Success ✅" });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth_model_1.default.findOne({ email });
        if (!user)
            throw (0, error_1.TryError)("Invalid email and password", 404);
        const isLogin = await bcrypt_1.default.compare(password, user.password);
        if (!isLogin)
            throw (0, error_1.TryError)("Invalid Credentials email and password incorrect", 401);
        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            image: user.image
        };
        const { accessToken, refreshToken } = generateToken(payload);
        await auth_model_1.default.updateOne({ _id: user._id }, { $set: {
                refreshToken,
                expiry: (0, moment_1.default)().add(7, 'days').toDate()
            } });
        res.cookie("accessToken", accessToken, getOptions("at"));
        res.cookie("refreshToken", refreshToken, getOptions("rt"));
        res.json({ message: "Login Success 🎉" });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Login failed please try after somtime");
    }
};
exports.login = login;
const refreshToken = async (req, res) => {
    try {
        if (!req.session)
            throw (0, error_1.TryError)("Failed to refresh token", 401);
        const { accessToken, refreshToken } = generateToken(req.session);
        await auth_model_1.default.updateOne({ _id: req.session.id }, { $set: {
                refreshToken,
                expiry: (0, moment_1.default)().add(7, "days").toString()
            } });
        res.cookie("accessToken", accessToken, getOptions("at"));
        res.cookie("refreshToken", refreshToken, getOptions("rt"));
        res.json({ message: "Token Refreshed" });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to refresh token");
    }
};
exports.refreshToken = refreshToken;
const getSession = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken)
            throw (0, error_1.TryError)("Invalid session", 401);
        const session = await jsonwebtoken_1.default.verify(accessToken, process.env.AUTH_SECRET);
        res.json(session);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Invalid Session");
    }
};
exports.getSession = getSession;
const updateProfilePicture = async (req, res) => {
    try {
        const path = `${process.env.S3_URL}/${req.body.path}`;
        if (!path || !req.session)
            throw (0, error_1.TryError)("Failed to update profile picture", 400);
        await auth_model_1.default.updateOne({
            _id: req.session.id
        }, { $set: { image: path } });
        res.json({ image: path });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to update profile picture");
    }
};
exports.updateProfilePicture = updateProfilePicture;
const logout = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            maxAge: 0,
            secure: false,
        };
        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);
        res.json({ message: "Logout Success!" });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to logout");
    }
};
exports.logout = logout;
