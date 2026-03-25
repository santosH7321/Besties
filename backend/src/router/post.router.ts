import { Router } from "express";
import { createPost } from "../controllers/post.controller";
const PostRouter = Router()

PostRouter.post('/', createPost)


export default PostRouter