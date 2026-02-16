import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";
import cors from "cors";
import AuthRouter from "./router/auth.router";
import cookieParser from "cookie-parser";
import StorageRouter from "./router/storage.router";
import AuthMiddleware from "./middleware/auth.middleware";
import FriendRouter from "./router/friend.router";
import SwaggerConfig from "./utils/swagger";
import { serve, setup } from "swagger-ui-express";
import StatusSocket from "./socket/status.socket";
import corsConfig from "./utils/cors";
import ChatSocket from "./socket/chat.socket";
import ChatRouter from "./router/chat.router";


const app = express();
const server = createServer(app);


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

const io = new Server(server, {cors: corsConfig});
StatusSocket(io)
ChatSocket(io)

// Middlewares
app.use(cors(corsConfig));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/api-docs", serve, setup(SwaggerConfig))
app.use("/auth", AuthRouter);
app.use("/storage",AuthMiddleware, StorageRouter);
app.use("/friend", AuthMiddleware, FriendRouter);
app.use("/chat", ChatRouter);