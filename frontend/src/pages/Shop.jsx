import React, {
    useEffect,
    useState,
} from "react";
import { ProductCard } from "../components/ProductCard";
import "../styles/shop.css";

export const Shop = () => {
    const [products, setProducts] =useState([]);
    const [loading, setLoading] =useState(true);

    useEffect(() => {
        const fetchProducts =
            async () => {
                try {
                    const res =await fetch("http://localhost:4000/api/products");
                    const data =await res.json();
                    setProducts(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="shop-loading">
                Loading Products...
            </div>
        );
    }

    return (
        <section className="shop">
            <div className="shop-header">
                <h1>Shop Products</h1>
                <p>Explore our latest collection</p>
            </div>

            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                            <ProductCard key={product._id}product={product} />
                        )
                    )
                ) : (
                    <h2>
                        No products found
                    </h2>
                )}
            </div>
        </section>
    );
};