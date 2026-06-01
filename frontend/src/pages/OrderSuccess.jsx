import React from "react";
import { Link } from "react-router-dom";


export const OrderSuccess = ()=>{
    return(
        <div className="container">
            <h2>
                Payment Success
            </h2>
            <p>Thank you for your order. we had securely received your payment and will process your shipment shortely.</p>
            <Link to="/shop" className="btn">Continue Shopping</Link>
        </div>
    )
}