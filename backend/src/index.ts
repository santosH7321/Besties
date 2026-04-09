import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import StatusSocket from "./socket/status.socket";
import ChatSocket from "./socket/chat.socket";
import VideoSocket from "./socket/video.socket";
import corsConfig from "./utils/cors";

mongoose.connect(process.env.DB!)
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB not connected"));

const server = createServer(app);
const io = new Server(server, { cors: corsConfig });

StatusSocket(io);
ChatSocket(io);
VideoSocket(io);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});