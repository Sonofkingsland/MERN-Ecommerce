import e from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productsRoutes.js";
import OrderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import analyticsRouter from "./routes/analyticsRoutes.js";
dotenv.config()

connectDB();
const app = e();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true}
));
app.use(e.json());
app.use(e.urlencoded({extended: true}));

app.get("/",(req,resp)=>{
    resp.send("YourShop backend is here")
}); 

app.use('/api/auth',authRouter)
app.use('/api/products',productRouter)
app.use('/api/orders',OrderRouter)
app.use('/api/payment',paymentRouter)
app.use('/api/analytics',analyticsRouter)



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})