"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authSchema = new mongoose_1.Schema({
    image: {
        type: String,
        default: null
    },
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String
    },
    expiry: {
        type: Date
    }
}, { timestamps: true });
authSchema.pre("save", async function () {
    this.password = await bcrypt_1.default.hash(this.password.toString(), 12);
});
authSchema.pre("save", function () {
    this.refreshToken = null;
    this.expiry = null;
});
const AuthModel = (0, mongoose_1.model)("Auth", authSchema);
exports.default = AuthModel;
