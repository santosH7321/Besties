import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import express from "express";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
