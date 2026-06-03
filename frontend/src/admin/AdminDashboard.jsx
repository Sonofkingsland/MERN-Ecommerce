import React, {useContext,useEffect,useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate,Link} from "react-router-dom";
import "../styles/adminDashboard.css";

export const AdminDashboard = () => {
    const { user } = useContext(AuthContext );
    const navigate = useNavigate();
    const [stats, setStats] =useState({
            totalUsers: 0,
            totalOrders: 0,
            totalProduct: 0,
            totalRevenue: 0
        });
    const [loading,setLoading] =useState(true);

    useEffect(() => {
        if (!user || user.role !== "admin" ) {
            navigate("/");
            return;
        }
        const fetchStats = async() => {
            try {
                const res =await fetch("http://localhost:4000/api/analytics",{
                        headers: {Authorization:`Bearer ${user.token}` }
                    });
                const data =await res.json();

                if (res.ok) {
                    setStats(data);
                }

            } catch (error) {
                console.log( error );
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [user,navigate ]);

    if (loading ) {
        return (
            <div className="admin-loading">Loading Dashboard...</div>
        );
    }

    return (
    <section className="admin-dashboard">

            <div className="dashboard-header">
                <h1> Admin Dashboard</h1>
                <p>Welcome back, {" "} {user?.name}</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <h2> { stats.totalUsers} </h2>
                </div>
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <h2>{ stats.totalOrders} </h2>
                </div>
                <div className="stat-card">
                    <h3>Products</h3>
                    <h2> { stats.totalProduct} </h2>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <h2>${ stats.totalRevenue } </h2>
                </div>
            </div>

            <div className="admin-links">
                <Link to="/admin/add-product" className="admin-btn"> Add Product</Link>
                <Link to="/admin/products" className="admin-btn"> Manage Products </Link>
                <Link to="/admin/orders" className="admin-btn"> Manage Orders </Link>
                <Link to="/admin/users" className="admin-btn">Manage Users</Link>
            </div>

        </section>
    );
};