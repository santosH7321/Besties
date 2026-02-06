import { SessionInterface } from "../middleware/auth.middleware";
import AuthModel from "../models/auth.model";
import FriendModel from "../models/friend.model";
import { CatchError } from "../utils/error"
import { Response } from "express";

export const addFriends = async (req: SessionInterface, res: Response) => {
    try {
        req.body.user = req.session?.id
        const friend = await FriendModel.create(req.body);
        res.json(friend);
    }
    catch(err){
        CatchError(err, res, "Failed to send friend request");
    }
}

export const fetchFriends = async (req: SessionInterface, res: Response) => {
    try {
        const user = req.session?.id;
        const friends = await FriendModel.find({user})
        res.json(friends)
    }
    catch(err){
        CatchError(err, res, "Failed to send friend request");
    }
}

export const suggestedFriends = async (req: SessionInterface, res: Response) => {
    try {
        const friends = await AuthModel.aggregate([
            {$sample: {size: 5}}
        ])
        res.json(friends);
    }
    catch(err){
        CatchError(err, res, "Failed to send friend request");
    }
}