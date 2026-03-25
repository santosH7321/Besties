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
