"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const twilio_controller_1 = require("../controllers/twilio.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const TwilioRouter = (0, express_1.Router)();
TwilioRouter.get("/turn-server", auth_middleware_1.default, twilio_controller_1.getTurnServer);
exports.default = TwilioRouter;
