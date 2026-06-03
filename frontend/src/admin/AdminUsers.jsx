import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/adminUsers.css";

export const AdminUsers = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
            return;
        }
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res =
                await fetch("http://localhost:4000/api/auth/users",
                    {
                        headers: { Authorization: `Bearer ${user.token}` }
                    }
                );

            const data = await res.json();
            if (res.ok) {
                setUsers(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (<h2 className="loading-text"> Loading Users...</h2>);
    }

    return (
        <section className="admin-users">

            <h1> Manage Users</h1>
            <div className="users-table-wrapper">
                {
                    users.length === 0 ? (
                        <h2>No users found</h2>) : (
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th> Joined</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    users.map((u) => (
                                        <tr key={u._id}>
                                            <td> {u.name} </td>
                                            <td> {u.email}</td>
                                            <td><span className={u.role === "admin" ? "admin-role" : "user-role"}> {u.role}</span> </td>
                                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        </section>
    );
};