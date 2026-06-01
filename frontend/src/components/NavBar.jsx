import React, { useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import '../styles/navbar.css'
import { AuthContext } from "../context/AuthContext"
import { useSelector } from "react-redux"


export const NavBar = () => {
    const { user, logout } = useContext(AuthContext)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const navigate = useNavigate()


    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">YourShop</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/cart">Cart ({cartItems.reduce((total, item) =>total + item.qty,0)})</Link></li>
                {
                    user ? (
                        <>
                            <li><NavLink to="/profile">Hi, {user?.name}</NavLink></li>
                            {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
                            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )
                }
            </ul>
        </nav>
    )
}