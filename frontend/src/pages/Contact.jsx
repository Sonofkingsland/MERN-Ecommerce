import React from "react";
import "../styles/contact.css";

export const Contact = () => {
    return (
        <section className="contact">
            <div className="contact-container">

                <div className="contact-info">
                    <h1>Contact Us</h1>
                    <p>
                        Have questions or need help? We’d love to hear from you.
                        Reach out to us anytime.
                    </p>

                    <div className="info-box">
                        <h3>Email</h3>
                        <p>yourshop@gmail.com</p>
                    </div>

                    <div className="info-box">
                        <h3>Phone</h3>
                        <p>+91 8000018609</p>
                    </div>

                    <div className="info-box">
                        <h3>Address</h3>
                        <p>govindpura, Jaipur, Rajasthan, India</p>
                    </div>
                </div>

                <div className="contact-form">
                    <h2>Send Message</h2>

                    <form>
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                        />

                        <textarea
                            rows="5"
                            placeholder="Your Message"
                            required
                        ></textarea>

                        <button type="submit">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};