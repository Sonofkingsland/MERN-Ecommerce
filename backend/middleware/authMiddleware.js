import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";

export const Protect = async(req,resp,next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token= req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await UserModel.findById(decoded.id).select('-password')
            next();
        } catch (error) {
            resp.status(401).json({
                message: "user not authorized ,token failed"
            })
        }
    }
    if(!token){
        resp.status(401).json({
            message: " server error, not authorized"
        })
    }
}