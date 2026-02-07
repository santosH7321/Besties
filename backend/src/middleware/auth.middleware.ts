import { NextFunction, Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import jwt, { JwtPayload } from "jsonwebtoken"
import mongoose from "mongoose";


export interface PayloadInterface {
    id: mongoose.Types.ObjectId
    fullname: string
    email: string
    mobile: string
    image: string | null | undefined
}

export interface SessionInterface extends Request{
    session?: PayloadInterface
}

const AuthMiddleware = async (req: SessionInterface, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken

        if(!accessToken){
            throw TryError("Faield to authenticate user", 401)
        }
        const payload = await jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload
        
        req.session = {
            id: payload.id,
            fullname: payload.fullname,
            email: payload.email,
            mobile: payload.mobile,
            image: payload.image
        }
    }   
    catch (err) {
        CatchError(err, res, "Faield to authorized user")
    }

}

export default AuthMiddleware;