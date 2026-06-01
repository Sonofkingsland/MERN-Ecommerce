import e from "express";
import { Protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { getAdminStats } from "../controllers/analyticsController.js";


const analyticsRouter = e.Router()

analyticsRouter.get("/",Protect,admin,getAdminStats)


export default analyticsRouter