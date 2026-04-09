"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFriendStatus = exports.friendRequest = exports.suggestedFriends = exports.deleteFriend = exports.fetchFriends = exports.addFriends = void 0;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const friend_model_1 = __importDefault(require("../models/friend.model"));
const error_1 = require("../utils/error");
const mongoose_1 = __importDefault(require("mongoose"));
const addFriends = async (req, res) => {
    try {
        req.body.user = req.session?.id;
        const friend = await friend_model_1.default.create(req.body);
        res.json(friend);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to send friend request");
    }
};
exports.addFriends = addFriends;
const fetchFriends = async (req, res) => {
    try {
        const userId = req.session?.id;
        const friends = await friend_model_1.default.find({
            status: 'accepted',
            $or: [
                { user: userId },
                { friend: userId }
            ]
        })
            .populate('friend')
            .populate('user');
        const modified = friends.map((item) => {
            const isUser = item.user._id.toString() === userId;
            return {
                _id: item._id,
                friend: isUser ? item.friend : item.user,
                status: item.status,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            };
        });
        res.json(modified);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to send friend request");
    }
};
exports.fetchFriends = fetchFriends;
const deleteFriend = async (req, res) => {
    try {
        await friend_model_1.default.deleteOne({ _id: req.params.id });
        res.json({ message: "Friend deleted" });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to send friend request");
    }
};
exports.deleteFriend = deleteFriend;
const suggestedFriends = async (req, res) => {
    try {
        if (!req.session)
            throw (0, error_1.TryError)("Failed to suggest friend", 401);
        const friends = await auth_model_1.default.aggregate([
            {
                $match: {
                    _id: { $ne: new mongoose_1.default.Types.ObjectId(req.session.id) }
                }
            },
            { $sample: { size: 5 } },
            { $project: { fullname: 1, image: 1, createdAt: 1 } }
        ]);
        const modified = await Promise.all(friends.map(async (item) => {
            const count = await friend_model_1.default.countDocuments({ friend: item._id });
            return count === 0 ? item : null;
        }));
        const filtered = modified.filter((item) => item !== null);
        res.json(filtered);
    }
    catch (err) {
        console.log(err);
        (0, error_1.CatchError)(err, res, "Failed to send friend request");
    }
};
exports.suggestedFriends = suggestedFriends;
const friendRequest = async (req, res) => {
    try {
        if (!req.session)
            throw (0, error_1.TryError)("Failed to fetch friends request");
        const friends = await friend_model_1.default.find({ friend: req.session.id, status: "requested" })
            .populate("user", "fullname image");
        res.json(friends);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to fetch friend request");
    }
};
exports.friendRequest = friendRequest;
const updateFriendStatus = async (req, res) => {
    try {
        if (!req.session)
            throw (0, error_1.TryError)("Failed to update friend status");
        await friend_model_1.default.updateOne({ _id: req.params.id }, { $set: { status: req.body.status } });
        res.json({ message: "Friend status updated" });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to fetch friend request");
    }
};
exports.updateFriendStatus = updateFriendStatus;
