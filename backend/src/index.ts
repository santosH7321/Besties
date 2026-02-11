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


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT,
        credentials: true
    }
})


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
    });
})

app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api-docs", serve, setup(SwaggerConfig))
app.use("/auth", AuthRouter);
app.use("/storage",AuthMiddleware, StorageRouter);
app.use("/friend", AuthMiddleware, FriendRouter);