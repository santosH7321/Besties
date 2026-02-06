import { NextFunction, Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import AuthModel from "../models/auth.model";
import moment from "moment";
import { SessionInterface } from "./auth.middleware";


const RefreshToken = async (req: SessionInterface, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken)
            throw TryError("Faield to refresh token", 401);

        const user = await AuthModel.findOne({refreshToken});

        if(!user)
            throw TryError("Faield to refresh token", 401);

        const today = moment();
        const expiry = moment(user.expiry);

        const isExpired = today.isAfter(expiry);

        if(isExpired)
            throw TryError("Faield to refresh token", 401);

        req.session = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            image: user.image ?? null
        }

        next();
        
    }
    catch (err) {
        CatchError(err, res, "Failed to refresh Token")
    }
}

export default RefreshToken;