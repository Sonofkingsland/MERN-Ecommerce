import React from "react";
import "../styles/productCard.css"
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <span className="product-badge">
                Trending
            </span>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${Number(product.price).toFixed(2)}</p>
                <Link to={`/product/${product._id}`} className="product-details-button">
                    View Details
                </Link>
            </div>

        </div>
    )
}