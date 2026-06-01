
import { orderModel } from "../model/order.js"
import ProductModel from "../model/products.js"
import UserModel from "../model/User.js"

export const getAdminStats = async (req,resp) => {
    try {
        const totalUsers = await UserModel.countDocuments({role: 'user'});
        const totalOrders = await orderModel.countDocuments({});
        const totalProduct = await ProductModel.countDocuments({});
        const orders = await orderModel.find({})
        
        const totalRevenueData = orders.reduce((acc,order) => acc + order.totalAmount ,0)

        resp.json({
            totalUsers,
            totalOrders,
            totalProduct,
            totalRevenue: totalRevenueData
        })
    } catch (error) {
        resp.json({
            message:"server error",
            error
        })
    }
}