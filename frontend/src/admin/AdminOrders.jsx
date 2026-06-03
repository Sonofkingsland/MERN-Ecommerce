import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/adminOrders.css";

export const AdminOrders = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
            return;
        }
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/orders", {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setOrders(data);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, status) => {
        try {
            const res = await fetch(`http://localhost:4000/api/orders/${orderId}/myStatus`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    },
                    body: JSON.stringify({ status })
                }
            );
            const data = await res.json();
            if (res.ok) {
                alert("Order status updated");
                setOrders(orders.map((order) => order._id === orderId ? { ...order, status } : order));
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (<h2 className="loading-text"> Loading Orders...</h2>);
    }

    return (
        <section className="admin-orders">

            <h1> Manage Orders</h1>
            <div className="orders-container">

                {orders.length === 0 ? (<h2> No orders found </h2>) : (
                    orders.map((order) => (
                        <div key={order._id} className="order-card">

                            <div className="order-info">
                                <p> <strong> Customer:</strong> {" "}{order.user?.name} </p>
                                <p> <strong> Email:</strong>{" "}{order.user?.email}</p>
                                <p><strong> Total:</strong>{" "}${order.totalAmount}</p>
                                <p><strong> Date:</strong> {" "}{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div className="status-box">
                                <span className="status">{order.status}</span>
                                <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    ))
                )
                }
            </div>
        </section>
    );
};