import e from "express";
import { createdOrder, verifyPayment } from "../controllers/paymentcontroller.js";

const paymentRouter = e.Router()

paymentRouter.post("/order",createdOrder)
paymentRouter.post("/verify",verifyPayment)


export default paymentRouter