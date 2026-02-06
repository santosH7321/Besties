import { Router } from "express";
import { addFriend, fetchFriend } from "../controllers/friend.controller";

const FriendRouter = Router();

FriendRouter.post("/", addFriend);
FriendRouter.get("/", fetchFriend);

export default FriendRouter;