import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/register.css";

export const Register = () =>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()


    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:4000/api/auth/register/',{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body:JSON.stringify({name,email,password})
            })
            const data = await res.json()
            if (res.ok) {
                alert('Registration successful! Please Check your email for the welcome OTP.')
                login(data)
                navigate("/")
                
            } else {
                alert(data.message)
                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    return(
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register</h2>
                <input type="text" placeholder="enter full name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <input type="email" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <input type="password" placeholder="enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
                <button type="submit" className="btn">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>

            </form>
        </div>
    )
}