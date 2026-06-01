import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import "../styles/checkout.css";

export const Checkout = () => {

    const { user } = useContext(AuthContext)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [address, setAddress] = useState({
        fullName: "", street: "", city: "", postalCode: "", country: ""
    });

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    const handlePayment = async () => {
        try {
            const orderRes = await fetch("http://localhost:4000/api/payment/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalPrice })
            })
            const orderData = await orderRes.json()

            if (!orderRes.ok) {
                const fallback = window.confirm("Razorpay keys unconfigured on backed. Use Student bypass mode to place test order?")
                if (fallback) {
                    return bypassPayment()
                } else {
                    return alert("Payment faild to initalize")
                }
            }

            const options = {
                key: 'rzp_test_dummykey123',   // student dummy fallback
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'YourShop',
                description: 'Test Transaction',
                order_id: orderData.id,
                handler: async function (response) {
                    const verifyRes = await fetch("http://localhost:4000/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response)
                    })
                    if (verifyRes.ok) {
                        const saveOrderRes = await fetch("http://localhost:4000/api/payment/order", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${user.token}`
                            },
                            body: JSON.stringify({
                                items: cartItems,
                                totalAmount: totalPrice,
                                address,
                                paymentId: response.razorpay_payment_id
                            })
                        })
                        if (saveOrderRes.ok) {
                            dispatch(clearCart())
                            navigate("/ordersuccess")
                        } else {
                            alert("Order saving failed")
                        }
                    } else {
                        alert("Payment verification failed")
                    }
                },
                prefill: {
                    name: address.fullName,
                    email: user?.email,
                    Contact: '8567923478'
                },
                theme: {
                    color: '#f97316'
                }
            }
            const rzp1 = new window.Razorpay(options)
            rzp1.open()
        } catch (error) {
            console.error(error);

        }
    }

    const bypassPayment = async () => {
        const saveOrderRes = await fetch("http://localhost:4000/api/payment/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: 'bypass_txn_' + Date.now()
            })
        })
        if (saveOrderRes.ok) {
            dispatch(clearCart())
            navigate("/ordersuccess")
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!user){
            alert("please login first")
            navigate("/login")
            return;
        }
        handlePayment()
    }

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="checkout-content">
                <form onSubmit={handleSubmit} className="shipping-form">
                    <h3>Shipping Address</h3>
                    <input type="text" placeholder="full name" required value={address.fullName} onChange={(e)=>setAddress({...address,fullName:e.target.value})} />
                    <input type="text" placeholder="street name" required value={address.street} onChange={(e)=>setAddress({...address,street:e.target.value})} />
                    <input type="text" placeholder="city name" required value={address.city} onChange={(e)=>setAddress({...address,city:e.target.value})} />
                    <input type="text" placeholder="postal code" required value={address.postalCode} onChange={(e)=>setAddress({...address,postalCode:e.target.value})} />
                    <input type="text" placeholder="country" required value={address.country} onChange={(e)=>setAddress({...address,country:e.target.value})} />

                    <div className="checkout-summary">
                        <h4>Toatl to Pay : {totalPrice.toFixed(2)}</h4>
                        <button type="submit" className="btn">Pay Now</button>
                    </div>
                </form>
            </div>
        </div>
    )
}