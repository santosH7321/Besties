import { Router } from "express";
import { addFriends, deleteFriend, fetchFriends, friendRequest, suggestedFriends } from "../controllers/friend.controller";

const FriendRouter = Router();

FriendRouter.post("/", addFriends);
FriendRouter.get("/", fetchFriends);
FriendRouter.get("/suggestion", suggestedFriends);
FriendRouter.get("/request", friendRequest)
FriendRouter.delete("/:id", deleteFriend)

export default FriendRouter;