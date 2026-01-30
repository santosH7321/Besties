import { Request, Response } from "express"
import AuthModel from "../models/auth.model";


export const signup = async (req: Request, res: Response) => {
    try {
        await AuthModel.create(req.body)
        res.status(200).json({message: "Signup Success ✅"});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}

export const login = (req: Request, res: Response) => {
    res.send("Login Success ✅");
}

export const forgotPassword = (req: Request, res: Response) => {
    res.send("Forgot Password Success ✅");
}