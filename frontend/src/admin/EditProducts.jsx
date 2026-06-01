import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/editProduct.css";

export const EditProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
            return;
        }

        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/products/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setFormData({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category,
                        stock: data.stock
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("stock", formData.stock);
            if (image) { data.append("image", image); }

            const res = await fetch(`http://localhost:4000/api/products/${id}`,
                {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${user.token}` },
                    body: data
                }
            );
            const response = await res.json();

            if ( res.ok) {
                alert("Product updated successfully");
                navigate( "/admin/products");
            } else { 
                alert( response.message );
            }

        } catch (error) {
            console.log(error);
        }
    };
    
    if (loading) {
        return (
            <h2 className="loading-text">Loading Product... </h2>
        );
    }

    return (
        <section className="edit-product-page">
            <form onSubmit={handleSubmit} className="edit-product-form">
                <h2>Edit Product</h2>
                <input type="text" name="name" placeholder="Product Name" value={ formData.name} onChange={handleChange} required/>
                <textarea name="description" placeholder="Description" value={ formData.description} onChange={handleChange} required/>
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={ handleChange} required  />
                <input type="text" name="category" placeholder="Category"value={formData.category}onChange={ handleChange } required />
                <input type="number" name="stock" placeholder="Stock" value={ formData.stock} onChange={handleChange} required/>
                <input type="file" accept="image/*" onChange={ (e) => setImage( e.target.files[0])}/>
                <button type="submit" className="update-btn"> Update Product</button>
            </form>
        </section>
    );
};