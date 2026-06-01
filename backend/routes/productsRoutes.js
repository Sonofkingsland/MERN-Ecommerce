import e from "express";
import { Protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { createProducts, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productsController.js";

import multer from "multer";

const upload = multer({dest: 'uploads/'})


const productRouter = e.Router()

// for all products 

productRouter.route('/').get(getProducts).post(Protect,admin,upload.single('image'), createProducts)


// specific products

productRouter.route("/:id").get(getProductById).put(Protect,admin,upload.single('image'),updateProduct).delete(Protect,admin,deleteProduct)

export default productRouter;