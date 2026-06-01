import React from "react"
import { Link } from "react-router-dom"
import '../styles/Footer.css'

export const Footer = ()=>{
    return(
        <footer className="footer">
            <div className="footer-content">
                <p> &copy;  {new Date().getFullYear()} YourShop. All rights reserved.</p>
                <ul className="footer-links">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                    <li><Link to="/return-policy">Return-Policy</Link></li>
                </ul>
            </div>
        </footer>
    )
}