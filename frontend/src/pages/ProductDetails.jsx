import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import "../styles/productDetails.css";
import toast from "react-hot-toast";

export const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/products/${id}`)
                const data = await res.json()
                console.log(data);
                if (data) {
                    setProduct(data);
                }

            } catch (error) {
                console.error(error)
            } finally {  
                setLoading(false)
            }
        }
        fetchProduct();
    }, [id])

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                qty: 1
            }))
            toast.success("Added to cart")
            navigate("/shop")
        }
    }

    if (loading) {
        return <div className="loading">Loading Product...</div>;
    }

    if (!product || !product._id) {
        return <div className="loading">Product not found</div>;
    }

    return (
        <section className="product-details">
            <div className="product-details-container">

                <div className="product-image-section">
                    <img
                        src={product?.imageUrl}
                        alt={product?.name}
                        style={{ width: "300px" }}
                        onLoad={() => console.log("loaded")}
                        onError={() => console.log("failed")}
                    />
                </div>

                <div className="product-info-section">
                    <h1>{product.name}</h1>
                    <p className="price">
                        ${product.price}
                    </p>
                    <p className="description">{product.description || "No description available"}</p>
                    <button onClick={handleAddToCart} className="add-cart-btn">Add To Cart </button>
                </div>
            </div>
        </section>
    );

}