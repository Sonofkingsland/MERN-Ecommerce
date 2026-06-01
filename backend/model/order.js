import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    items: [
        {
            productId:{type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{ type:Number, required:true, min:1 },
            price: {type:String,required:true}
        }
    ],
    totalAmount: {type:Number,required:true},
    address: {
        fullName: {type:String,required:true},
        street: {type:String,required: true},
        city: {type:String,required:true},
        postalCode: {type: String,required:true},
        country:{type:String,required:true}
    },
    paymentId:{type:String,required:true},
    status: {type:String, enum:['pending','processing','shipped','delivered'],default:'pending'}
},{timestamps:true})

export const orderModel = mongoose.model('Order',orderSchema);