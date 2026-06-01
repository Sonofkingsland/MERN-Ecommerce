import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile.css"


export const Profile = () => {

    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return;
        }
        const fetchMyOrders = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/orders/myorders", {
                    headers: { Authorization: `Bearer ${user.token}` }
                })
                const data = await res.json()

                if (res.ok) {
                    setOrders(Array.isArray(data) ? data : [])
                } else {
                    //Token obsolete or 401 : clear and bounce
                    if (res.status === 401) {
                        logout()
                        navigate("/login")
                    } setOrders([])
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        };
        fetchMyOrders()
    }, [user, navigate])

    const handleLogout = () => {
        logout()
        navigate("/login")

    }
    if (!user) return null;

    return (
        <>
            <div className="container">
                <div className="container-data">
                    <h2>My Profile</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong>{user.email}</p>
                    <span>Account Type: {user.role.toUpperCase()}</span>
                </div>
                <button onClick={handleLogout} className="btng">Logout</button>
            </div>
            <h3>Order History</h3>
            {loading ? (
                <p className="loading-text">Fetching your orders...</p>):orders.length===0 ? (
                    <div className="warning">
                        <p>You haven't placed any orders yet.</p>
                        <Link to="/shop">Start Shopping</Link>
                    </div>
                ): (
                    <div className="grid">
                        {orders.map(order=>(
                            <div key={order._id} className="grid-data">
                                <div>
                                    <p>Order ID: <span>{order._id}</span></p>
                                    <p>Placed On: <span>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                                    <p>Total: <strong>{order.totalAmount.toFixed(2)}</strong></p>
                                </div>
                                <div>
                                    <span className="status">
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </>
    )
}