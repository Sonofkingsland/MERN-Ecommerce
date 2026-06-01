import React from "react";
import "../styles/about.css";

export const About = () => {
    return (
        <section className="about">
            <div className="about-container">
                <h1>About YourShop</h1>

                <p className="about-text">
                    Welcome to <strong>YourShop</strong>, your trusted online
                    shopping destination. We provide high-quality products at
                    affordable prices with a smooth and secure shopping
                    experience.
                </p>

                <div className="about-cards">
                    <div className="about-card">
                        <h3>Our Mission</h3>
                        <p>
                            To provide customers with quality products,
                            affordable prices, and fast delivery.
                        </p>
                    </div>

                    <div className="about-card">
                        <h3>Why Choose Us?</h3>
                        <p>
                            Wide range of products, secure payment,
                            trusted service, and customer satisfaction.
                        </p>
                    </div>

                    <div className="about-card">
                        <h3>Customer Support</h3>
                        <p>
                            We are here to help you anytime with your
                            shopping experience and support needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};