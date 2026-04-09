"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_swagger_1 = __importDefault(require("../swagger/auth.swagger"));
const friend_swagger_1 = __importDefault(require("../swagger/friend.swagger"));
const product_swagger_1 = __importDefault(require("../swagger/product.swagger"));
const SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Besties official api",
        description: "All private and public api listed here",
        version: "1.0.0",
        contact: {
            name: "Santosh Kumar",
            email: "santoshkumar23kky@gmail.com"
        }
    },
    servers: [
        { url: process.env.SERVER }
    ],
    paths: {
        ...product_swagger_1.default,
        ...auth_swagger_1.default,
        ...friend_swagger_1.default
    }
};
exports.default = SwaggerConfig;
