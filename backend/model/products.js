import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{type:String,required: true},
    description:{type:String,required: true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    stock :{type:Number,required:true},
    imageUrl:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    rating:{type:Number,default:0},
    numReview:{type:Number,default:0}
})

const ProductModel = mongoose.model('Product',productSchema)

export default ProductModel;