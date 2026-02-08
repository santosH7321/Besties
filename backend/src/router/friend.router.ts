import { Router } from "express";
import { addFriends, deleteFriend, fetchFriends, suggestedFriends } from "../controllers/friend.controller";

const FriendRouter = Router();

FriendRouter.post("/", addFriends);
FriendRouter.get("/", fetchFriends);
FriendRouter.get("/suggestion", suggestedFriends);
FriendRouter.delete("/:id", deleteFriend)

export default FriendRouter;