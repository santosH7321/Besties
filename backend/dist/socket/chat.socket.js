"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_controller_1 = require("../controllers/chat.controller");
const s3_1 = require("../utils/s3");
const ChatSocket = (io) => {
    io.on("connection", (socket) => {
        socket.on("message", (payload) => {
            (0, chat_controller_1.createChat)({
                ...payload,
                from: payload.from.id
            });
            io.to(payload.to).emit("message", {
                from: payload.from,
                message: payload.message
            });
        });
        socket.on("attachment", async (payload) => {
            (0, chat_controller_1.createChat)({
                ...payload,
                from: payload.from.id
            });
            io.to(payload.to).emit("attachment", {
                from: payload.from,
                message: payload.message,
                file: {
                    path: await (0, s3_1.downloadObject)(payload.file.path),
                    type: payload.file.type
                }
            });
        });
    });
};
exports.default = ChatSocket;
