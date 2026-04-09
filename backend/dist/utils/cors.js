"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsConfig = {
    origin: process.env.CLIENT,
    credentials: true
};
exports.default = corsConfig;
