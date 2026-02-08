import { Router } from "express";
import { addFriends, deleteFriend, fetchFriends, friendRequest, suggestedFriends, updateFriendStatus } from "../controllers/friend.controller";

const FriendRouter = Router();

FriendRouter.post("/", addFriends);
FriendRouter.put("/:id", updateFriendStatus)
FriendRouter.get("/", fetchFriends);
FriendRouter.get("/suggestion", suggestedFriends);
FriendRouter.get("/request", friendRequest)
FriendRouter.delete("/:id", deleteFriend)

export default FriendRouter;