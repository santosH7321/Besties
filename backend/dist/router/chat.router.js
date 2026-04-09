"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const chat_controller_1 = require("../controllers/chat.controller");
const ChatRouter = (0, express_1.Router)();
ChatRouter.get('/:to', auth_middleware_1.default, chat_controller_1.fetchChats);
exports.default = ChatRouter;
