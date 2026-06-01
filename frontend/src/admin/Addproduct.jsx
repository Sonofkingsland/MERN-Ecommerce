import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/addProduct.css";

export const Addproduct = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("stock", formData.stock);
            data.append("image", image);

            const res = await fetch("http://localhost:4000/api/products", {
                method: "POST",
                headers: { Authorization: `Bearer ${user.token}` },
                body: data
            }
            );
            const response = await res.json();

            if (res.ok) {
                alert("Product added successfully");
                navigate("/admin/products");
            } else {
                alert(response.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="add-product-page">
            <form onSubmit={handleSubmit} className="add-product-form">
                <h2> Add Product</h2>
                <input type="text" name="name" placeholder="Product Name" required value={formData.name} onChange={handleChange} />
                <textarea name="description" placeholder="Description" required value={formData.description} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" required value={formData.price} onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" required value={formData.category} onChange={handleChange} />
                <input type="number"  name="stock" placeholder="Stock" required value={ formData.stock }onChange={ handleChange}/>
                <input type="file" accept="image/*" required onChange={(e) =>setImage( e.target.files[0])}/>
                <button type="submit" className="add-btn">{loading ? "Adding..." : "Add Product" }</button>
            </form>
        </section>
    );
};