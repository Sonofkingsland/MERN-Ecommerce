import e from "express";
import { Protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { createOrder, getAllOrders, myOrders, updateOrderStatus } from "../controllers/orderController.js";

const OrderRouter=e.Router()


OrderRouter.route("/").post(Protect,createOrder).get(Protect,admin,getAllOrders)
OrderRouter.route("/myOrders").get(Protect,myOrders)
OrderRouter.route("/:id/myStatus").put(Protect,admin,updateOrderStatus)
export default OrderRouter