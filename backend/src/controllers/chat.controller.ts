import mongoose from "mongoose"
import ChatModel from "../models/chat.model"


interface PayloadInterface {
    from: string
    to: string
    message: string
    file?: {
        path: string
        type: string
    }
}

export const createChat = (payload: PayloadInterface)=>{
    ChatModel.create()
    .catch((err)=>{
        console.log(err.message)
    })
}

