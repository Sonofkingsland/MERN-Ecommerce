import Razorpay from "razorpay"
import crypto from "crypto"
import { configDotenv } from "dotenv"

export const createdOrder = async (req, resp) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
        const options = {
            amount: req.body.amount * 100,  //amount in the smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }
        const order = await instance.orders.create(options)
        resp.status(200).json(order)
    } catch (error) {
        resp.status(500).json({
            message: "server error"
        })
    }
}


// verify payment



export const verifyPayment = async (req, resp) => {
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
        const genrated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).
        update(razorpay_order_id + "|" +razorpay_payment_id).digest("hex");

        if (genrated_signature === razorpay_signature) {
            resp.status(200).json({
                message:"payment verified successfully"
            })
        } else {
            resp.status(400).json({
                message:"payment verification failed"
            })
        }
    } catch (error) {
        resp.status(500).json({
            message: "server error"
        })
    }
}