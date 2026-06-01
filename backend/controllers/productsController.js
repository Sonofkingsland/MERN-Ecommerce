import cloudinary from "../config/cloudinary.js";
import ProductModel from "../model/products.js"

export const getProducts = async (req, resp) => {
    try {
        const products = await ProductModel.find({});
        resp.json(products)
    } catch (error) {
        resp.status(500).json({ message: "server error" })
    }
}

export const getProductById = async (req, resp) => {
    try {
        const product = await ProductModel.findById(req.params.id)

        if (product) {
            resp.json(product)
        } else {
            resp.status(400).json({
                message: "product not found"
            })
        }
    } catch (error) {
        resp.status(500).json({
            message: "server error"
        })
    }
}



// create product


export const createProducts = async (req, resp) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imageUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            
            imageUrl = result.secure_url;
        }

        const product = new ProductModel({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });

        const savedProduct = await product.save();
        resp.status(201).json(savedProduct)
    } catch (error) {
        console.log(error);
        resp.status(500).json({

            message:"server error"
        })
    }
}


// update product


export const updateProduct = async(req,resp)=>{
    try {
        const {name,description,price,category,stock} = req.body
        const product = await ProductModel.findById(req.params.id)

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                console.log(result);
                product.imageUrl = result.secure_url;
                
            }
            const updateProduct = await product.save()
            resp.json(updateProduct)
        }
        else{
            resp.status(404).json({message: "product not found"})

        }
    } catch (error) {
        resp.status(500).json({
            message: 'server error'
        })
    }
}

// delete product

export const deleteProduct = async(req,resp)=>{
    try {
        const product = await ProductModel.findById(req.params.id)

        if(product){
            await product.deleteOne()
            resp.json({message:"product removed"})
        }else{
            resp.status(404).json({message:"product not found"})
        }
    } catch (error) {
        resp.status(500).json({message:"server error"})
    }
}