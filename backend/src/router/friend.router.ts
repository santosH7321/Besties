import { Router } from "express";
import { addFriends, fetchFriends, suggestedFriends } from "../controllers/friend.controller";

const FriendRouter = Router();

FriendRouter.post("/", addFriends);
FriendRouter.get("/", fetchFriends);
FriendRouter.get("/suggestion", suggestedFriends);

export default FriendRouter;