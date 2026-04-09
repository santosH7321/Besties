"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChats = exports.createChat = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
const error_1 = require("../utils/error");
const s3_1 = require("../utils/s3");
const createChat = (payload) => {
    chat_model_1.default.create(payload)
        .catch((err) => {
        console.log(err.message);
    });
};
exports.createChat = createChat;
const fetchChats = async (req, res) => {
    try {
        if (!req.session)
            throw (0, error_1.TryError)("Failed to fetch chats");
        const chats = await chat_model_1.default.find({
            $or: [
                { from: req.session.id, to: req.params.to },
                { from: req.params.to, to: req.session.id }
            ]
        })
            .populate("from", "fullname email mobile")
            .lean();
        const modifiedChats = await Promise.all(chats.map(async (item) => {
            if (item.file) {
                return {
                    ...item,
                    file: {
                        path: item.file.path && await (0, s3_1.downloadObject)(item.file.path),
                        type: item.file.type
                    }
                };
            }
            else {
                return item;
            }
        }));
        res.json(modifiedChats);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to fetch chats");
    }
};
exports.fetchChats = fetchChats;
