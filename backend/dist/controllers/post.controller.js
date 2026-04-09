"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.fetchPosts = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const error_1 = require("../utils/error");
const createPost = async (req, res) => {
    try {
        req.body.user = req.session?.id;
        const post = await post_model_1.default.create(req.body);
        res.json(post);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to create post");
    }
};
exports.createPost = createPost;
const fetchPosts = async (req, res) => {
    try {
        const userId = req.session?.id;
        const posts = await post_model_1.default.find({ user: userId }).sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to fetch post");
    }
};
exports.fetchPosts = fetchPosts;
const updatePost = async (req, res) => {
    try {
        const post = await post_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post)
            throw (0, error_1.TryError)("Failed to find post for update");
        res.json(post);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to update post");
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const post = await post_model_1.default.findByIdAndDelete(req.params.id);
        if (!post)
            throw (0, error_1.TryError)("Failed to find post for update");
        res.json(post);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to delete post");
    }
};
exports.deletePost = deletePost;
