import { Request, Response } from "express"
import Razorpay from "razorpay"
import { CatchError, TryError } from "../utils/error"


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = async (req: Request, res: Response)=>{
    try {
        const amount = req.body?.amount
        if(!amount)
            throw TryError("Amount is required", 400)

        const payload = {
            amount: (amount*100),
            currency: process.env.CURRENCY!,
            receipt: `rcp_${Date.now()}`
        }

        const order = await razorpay.orders.create(payload)
        res.json(order)
    }
    catch(err)
    {
        CatchError(err, res, "Failed to create order")
    }
}

