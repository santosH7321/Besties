import mongoose, { Schema, model } from "mongoose";

const friendSchem = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Auth"
    },
    friend: {
        type: mongoose.Types.ObjectId,
        ref: "Auth"
    },
    status: {
        type: String,
        enum: ['request', 'rejected', 'accepted'],
        default: "requested"
    },
    type: {
        type: String,
        enum: ['send', 'recieved'],
        default: 'send'
    }
}, {timestamps: true});

const FriendModel = model("Friend", friendSchem);
export default FriendModel