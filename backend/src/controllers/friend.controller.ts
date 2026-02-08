import { SessionInterface } from "../middleware/auth.middleware";
import AuthModel from "../models/auth.model";
import FriendModel from "../models/friend.model";
import { CatchError, TryError } from "../utils/error"
import { Response, Request } from "express";
import mongoose from "mongoose";

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
        const friends = await FriendModel.find({user}).populate('friend')
        res.json(friends)
    }
    catch(err){
        CatchError(err, res, "Failed to send friend request");
    }
}

export const deleteFriend = async (req: Request, res: Response)=>{
    try {   
        await FriendModel.deleteOne({_id: req.params.id})
        res.json({message: "Friend deleted"})
    }
    catch(err)
    {
        CatchError(err, res, "Failed to send friend request")
    }
}

export const suggestedFriends = async (req: SessionInterface, res: Response)=>{
    try {
        if(!req.session)
            throw TryError("Failed to suggest friend", 401)

        const friends = await AuthModel.aggregate([
            {
                $match: {
                    _id: {$ne: new mongoose.Types.ObjectId(req.session.id)}
                }
            },
            {$sample: {size: 5}},
            {$project: {fullname: 1, image: 1, createdAt: 1}}
        ])
        
        const modified = await Promise.all(
            friends.map(async (item)=>{
                const count = await FriendModel.countDocuments({friend: item._id})
                return count === 0 ? item : null
            })
        )

        const filtered = modified.filter((item)=>item !== null)
        res.json(filtered)
    }
    catch(err)
    {
        console.log(err)
        CatchError(err, res, "Failed to send friend request")
    }
}