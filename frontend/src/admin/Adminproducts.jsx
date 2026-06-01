import React, {useContext,useEffect,useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import "../styles/adminProducts.css";

export const Adminproducts = () => { const { user } =useContext( AuthContext );
    const navigate =useNavigate();
    const [products,setProducts] = useState([]);
    const [loading,setLoading] =useState(true);
    useEffect(() => {
        if ( !user || user.role !== "admin") {
            navigate("/");
            return;
        }
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
            try {
                const res =await fetch( "http://localhost:4000/api/products");
                const data =await res.json();
                if ( res.ok) {
                    setProducts(  data);
                }
            } catch ( error) {
                console.log( error);
            } finally {
                setLoading( false);
            }
        };

    const handleDelete = async (id) => {
            const confirmDelete = window.confirm("Delete this product?");
            if (!confirmDelete ) return;
            try {
                const res =  await fetch( `http://localhost:4000/api/products/${id}`,
                        {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${user.token}`}
                        }
                    );

                const data =await res.json();
                if (res.ok) {
                    alert(  "Product deleted");
                    setProducts( products.filter((item) =>  item._id !== id));
                } else {
                    alert( data.message );
                }

            } catch ( error) {
                console.log(error);
            }
        };
        
    if (loading ) {
        return (
            <h2 className="loading-text"> Loading Products...</h2>
        );
    }

    return (
        <section className="admin-products">
            <div className="admin-header">
                <h1>Manage Products</h1>
                <Link to="/admin/add-product" className="add-product-btn"> + Add Product</Link>
            </div>

            <div className="products-grid">
                {
                    products.map(
                    (product) => (
                         <div key={ product._id } className="product-card-admin" >

                            <img src={ product.imageUrl }alt={product.name}/>
                            <h3>{  product.name }</h3>
                            <p>${ product.price}</p>
                            <p> Stock: {" "}{product.stock} </p>

                            <div className="admin-actions">
                                <Link to={`/admin/edit-product/${product._id}`} className="edit-btn" > Edit </Link>
                                <button onClick={() => handleDelete( product._id) } className="delete-btn"> Delete </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};