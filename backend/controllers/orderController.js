import { orderModel } from "../model/order.js";
import { sendEmail } from "../utils/sendEmail.js";


// create order


export const createOrder = async (req, resp) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (!items || items.length === 0 || !totalAmount || !address) {
            return resp.status(400).json({ message: "invalid order data" })
        } else {
            const order = new orderModel({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })
            await order.save()
            const message = `Dear ${req.user.name},\n\nThank you for your order! your order has been successfully created with the order details:\n\nOrder ID: ${order._id}\nTotal Amount: ${totalAmount}\nShipping Address: ${address.fullName}${address.street}${address.city}${address.postalCode}${address.country}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nYourShop`
            await sendEmail(req.user.email, 'order created', message)
            resp.status(201).json({ message: "order created successfully", order })
        }
    } catch (error) {
        console.error("Create Order Error:", error);

        resp.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
}


// get order for user


export const myOrders = async (req, resp) => {
    try {
        const orders = await orderModel.find({ user: req.user._id }).populate('items.productId', 'name price')
        resp.json(orders)
    } catch (error) {
        resp.status(500).json({
            message: "Error in fetching orders", error
        })
    }
}



// get all orders for admin


export const getAllOrders = async (req, resp) => {
    try {
        const orders = await orderModel.find({}).populate('user', 'name email')
        resp.json(orders)
    } catch (error) {
        resp.status(500).json({
            message: "Error in fetching orders", error
        })
    }
}


// update order for admin


export const updateOrderStatus = async (req, resp) => {
    try {
        const { status } = req.body;
        const order = await orderModel.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save()
            resp.json({ message: "order status updated", order })

        } else {
            resp.status(404).json({ message: "order not found" })
        }
    } catch (error) {
        resp.status(500).json({
            message: "Error in updating order",
            error
        })
    }
}