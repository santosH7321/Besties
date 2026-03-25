import { Router } from "express";
import { createPost, deletePost, fetchPosts, updatePost } from "../controllers/post.controller";
const PostRouter = Router()

PostRouter.post('/', createPost)
PostRouter.get('/', fetchPosts)
PostRouter.put('/:id', updatePost)
PostRouter.delete('/:id', deletePost)

export default PostRouter