import UserModel from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/sendEmail.js";


const genrateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: '30d'})
}

// Register a new user

export const registerUser = async (req, resp) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return resp.status(400).json({
                message: "User already exists",
                success: false
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({ name, email, password: hashedPassword });
        if (newUser) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const message = `
            Welcome to YourShop, ${name}! Thank you for registering with us.
                your OTP for YourShop registration is : ${otp}
            `;

            await sendEmail(email, 'Welcome to YourShop - Your OTP for Registraion', message)

            resp.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role,
                token:genrateToken(newUser._id),
                message: "user registerd successfully, please check your email for the OTP.",
                success: true
            })
        }
        else{
            resp.status(400).json({
                message:"technical server error",
                success:false
            })
        }

    } catch (error) {
        resp.status(500).json({
            message: "server error",
            success: false
        })
    }
}

// login User

export const loginUser = async(req,resp)=>{
    const {email,password}=req.body;

    try {
        const user = await UserModel.findOne({email})

        if (user && (await bcrypt.compare(password,user.password))) {
            
            resp.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: genrateToken(user._id)
            })
        } else {
            resp.status(400).json({
                message:"Invalid email or password"
            })
        }
    } catch (error) {
        resp.status(500).json({
            message:"server error"
            
        })
    }
};

export const getUsers =async(req,resp)=>{
    try {
        const users = await UserModel.find({}).select('-password')
        resp.json(users)
    } catch (error) {
        resp.status(500).json({
            message: "server error"
        })
    }
}
