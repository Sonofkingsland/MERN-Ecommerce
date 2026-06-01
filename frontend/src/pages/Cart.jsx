import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, } from "../redux/cartSlice";
import "../styles/cart.css";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleUpdateQty = (item,qty) => {
        if (qty>0) {
            dispatch(addToCart({...item,qty}))
        }
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    return (
        <section className="cart-page">
            <div className="cart-container">
                <h1>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your Cart is Empty. <Link to="/shop">Go Shopping</Link></h2>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                    <div key={item.productId} className="cart-item">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                        />
                                        <div className="cart-info">
                                            <h3>{ item.name}</h3>
                                            <p> ${item.price}</p>
                                            <div className="qty-controls">
                                                <button onClick={()=>handleUpdateQty(item,item.qty - 1)}>-</button>
                                                <span>{item.qty}</span>
                                                <button onClick={()=>handleUpdateQty(item,item.qty + 1)}>+</button>
                                            </div>
                                        </div>
                                        <button onClick={() =>handleRemove(item.productId) }className="remove-btn">Remove</button>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="cart-summary">
                            <h2>Total: ${totalPrice.toFixed(2)}</h2>
                            <button onClick={()=>navigate("/checkout")} className="checkout-btn">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};