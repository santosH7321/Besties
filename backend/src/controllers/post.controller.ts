import { SessionInterface } from "../middleware/auth.middleware"
import PostModel from "../models/post.model"
import { CatchError, TryError } from "../utils/error"
import { Response } from "express"

export const createPost = async (req: SessionInterface, res: Response)=>{
    try {
        req.body.user = req.session?.id
        const post = await PostModel.create(req.body)
        res.json(post)
    }
    catch(err)
    {
        CatchError(err, res, "Failed to create post")
    }
}

export const fetchPosts = async (req: SessionInterface, res: Response)=>{
    try {
        const userId = req.session?.id
        const posts = await PostModel.find({user: userId}).sort({createdAt: -1})
        res.json(posts)
    }
    catch(err)
    {
        CatchError(err, res, "Failed to fetch post")
    }
}

export const updatePost = async (req: SessionInterface, res: Response)=>{
    try {
        const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!post)
            throw TryError("Failed to find post for update")

        res.json(post)
    }
    catch(err)
    {
        CatchError(err, res, "Failed to update post")
    }
}

export const deletePost = async (req: SessionInterface, res: Response)=>{
    try {
        const post = await PostModel.findByIdAndDelete(req.params.id)
        if(!post)
            throw TryError("Failed to find post for update")

        res.json(post)
    }
    catch(err)
    {
        CatchError(err, res, "Failed to delete post")
    }
}