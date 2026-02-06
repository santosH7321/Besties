import { Router } from "express";
import { addFriend } from "../controllers/friend.controller";

const FriendRouter = Router();

FriendRouter.post("/", addFriend);

export default FriendRouter;