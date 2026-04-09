"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const PaymentRouter = (0, express_1.Router)();
PaymentRouter.post("/order", payment_controller_1.createOrder);
PaymentRouter.post("/webhook", payment_controller_1.webhook);
exports.default = PaymentRouter;
