import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/home.css"
import { ProductCard } from "../components/ProductCard"
export const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/products/")
                const data = await res.json()
                setProducts(data.slice(0, 4))   //featured products
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    return (
        <div className="home-container">
            <div className="hero-banner">
                <h1>welcome to YourShop</h1>
                <p>Your one stop for all needs. Explore our wild range of products and
                    enjoy seamless shopping exprience.
                </p>
                <Link to="/shop" className="hero-btn">
                    Shop Now
                </Link>
            </div>

            <h2>Featured Products</h2>
            {
                loading ? (
                    <div className="loader"></div>
                ) : (
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )
            }
        </div>
    )
}