import { Request, Response } from "express"
import AuthModel from "../models/auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CatchError, TryError } from "../utils/error";
import { PayloadInterface } from "../middleware/auth.middleware";

const accessTokenExpiry = '10m'


const generateToken = (payload: PayloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.AUTH_SECRET!, {expiresIn: accessTokenExpiry});
    return accessToken;
}

export const signup = async (req: Request, res: Response) => {
    try {
        await AuthModel.create(req.body)
        res.json({message: "Signup Success ✅"});
    } catch (err: unknown) {
        if(err instanceof Error)
            res.status(500).json({message: err.message});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await AuthModel.findOne({email});

        if(!user)
        throw TryError("Invalid email and password", 404)
        
        const isLogin = await bcrypt.compare(password, user.password);

        if(!isLogin)
        throw TryError("Invalid Credentials email and password incorrect", 401)

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile
        }

        const options = {
            httpOnly: true,
            maxAge: 10*60*1000,
            secure: false,
        }

        const accessToken = generateToken(payload)
        res.cookie("accessToken", accessToken, options)
        res.json({message: "Login Success 🎉"});    
        }
        catch (err: unknown) {
            CatchError(err, res, "Login failed please try after somtime")
        }
}

export const forgotPassword = (req: Request, res: Response) => {
    res.send("Forgot Password Success ✅");
}

export const getSession = async (req: Request, res: Response) => {
    try {
        const accessToken = req.cookies.accessToken
        
        if(!accessToken)
            throw TryError("Invalid session", 401)
        const session = await jwt.verify(accessToken, process.env.AUTH_SECRET!)
        res.json(session)
    }
    catch (err){
        CatchError(err, res, "Invalid Session")
    }
}