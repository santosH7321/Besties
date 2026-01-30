import { Request, Response } from "express"
import AuthModel from "../models/auth.model";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
    try {
        await AuthModel.create(req.body)
        res.json({message: "Signup Success ✅"});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await AuthModel.findOne({email});
    if(!user){
        throw new Error("User not found, please try to signup first")
    }

    const isLogin = await bcrypt.compare(password, user.password);
    if(!isLogin)
        throw new Error("Invalid Credentials email and password incorrect");

    res.json({message: "Login Success ✅"});
}

export const forgotPassword = (req: Request, res: Response) => {
    res.send("Forgot Password Success ✅");
}