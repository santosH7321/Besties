import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRouter from "./router/auth.router";
import StorageRouter from "./router/storage.router";
import FriendRouter from "./router/friend.router";
import ChatRouter from "./router/chat.router";
import TwilioRouter from "./router/twilio.router";
import PaymentRouter from "./router/payment.router";
import PostRouter from "./router/post.router";
import AuthMiddleware from "./middleware/auth.middleware";
import { serve, setup } from "swagger-ui-express";
import SwaggerConfig from "./utils/swagger";
import corsConfig from "./utils/cors";

const app = express();

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", serve, setup(SwaggerConfig));
app.use("/auth", AuthRouter);
app.use("/storage", AuthMiddleware, StorageRouter);
app.use("/friend", AuthMiddleware, FriendRouter);
app.use("/chat", ChatRouter);
app.use("/twilio", TwilioRouter);
app.use("/payment", PaymentRouter);
app.use("/post", AuthMiddleware, PostRouter);

export default app;