import e from "express";
import { getUsers, loginUser, registerUser } from "../controllers/authController.js";
import { Protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";


const authRouter=e.Router();

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.get("/users",Protect,admin,getUsers)

export default authRouter;