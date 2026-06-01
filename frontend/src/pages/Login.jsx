import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "../styles/register.css";


export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:4000/api/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (res.ok) {
                login(data)
                navigate("/")
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error(error);

        }
    }
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                <input type="email" placeholder="enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)}  required />
                <button type="submit" className="btn">Login</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}