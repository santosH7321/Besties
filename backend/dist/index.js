"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DB)
    .then(() => { console.log("DB connected"); })
    .catch(() => { console.log("DB not connected"); });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./router/auth.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const storage_router_1 = __importDefault(require("./router/storage.router"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const friend_router_1 = __importDefault(require("./router/friend.router"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const swagger_ui_express_1 = require("swagger-ui-express");
const status_socket_1 = __importDefault(require("./socket/status.socket"));
const cors_2 = __importDefault(require("./utils/cors"));
const chat_socket_1 = __importDefault(require("./socket/chat.socket"));
const chat_router_1 = __importDefault(require("./router/chat.router"));
const video_socket_1 = __importDefault(require("./socket/video.socket"));
const twilio_router_1 = __importDefault(require("./router/twilio.router"));
const payment_router_1 = __importDefault(require("./router/payment.router"));
const post_router_1 = __importDefault(require("./router/post.router"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const io = new socket_io_1.Server(server, { cors: cors_2.default });
(0, status_socket_1.default)(io);
(0, chat_socket_1.default)(io);
(0, video_socket_1.default)(io);
// Middlewares
app.use((0, cors_1.default)(cors_2.default));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api-docs", swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swagger_1.default));
app.use("/auth", auth_router_1.default);
app.use("/storage", auth_middleware_1.default, storage_router_1.default);
app.use("/friend", auth_middleware_1.default, friend_router_1.default);
app.use("/chat", chat_router_1.default);
app.use("/twilio", twilio_router_1.default);
app.use("/payment", payment_router_1.default);
app.use("/post", auth_middleware_1.default, post_router_1.default);
