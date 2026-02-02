import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import express from "express";
import cors from "cors";
import AuthRouter from "./router/auth.router";
const app = express();
import cookieParser from "cookie-parser";
import StorageRouter from "./router/storage.router";
import AuthMiddleware from "./middleware/auth.middleware";

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", AuthRouter);
app.use("/storage",AuthMiddleware, StorageRouter);