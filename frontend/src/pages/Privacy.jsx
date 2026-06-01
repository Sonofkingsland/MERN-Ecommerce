import React from "react";
import "../styles/privacy.css";

export const Privacy = () => {
    return (
        <section className="privacy">
            <div className="privacy-container">
                <h1>Privacy Policy</h1>
                <p className="privacy-date">
                    Last Updated: May 2026
                </p>

                <div className="privacy-content">

                    <div className="privacy-box">
                        <h2>Information We Collect</h2>
                        <p>
                            We may collect personal information such as
                            your name, email address, shipping details,
                            and payment information to process orders
                            and improve your shopping experience.
                        </p>
                    </div>

                    <div className="privacy-box">
                        <h2>How We Use Your Information</h2>
                        <p>
                            Your information is used to process orders,
                            improve our services, provide customer
                            support, and send updates related to
                            purchases.
                        </p>
                    </div>

                    <div className="privacy-box">
                        <h2>Data Security</h2>
                        <p>
                            We take appropriate security measures to
                            protect your personal information and ensure
                            safe transactions.
                        </p>
                    </div>

                    <div className="privacy-box">
                        <h2>Cookies</h2>
                        <p>
                            Our website may use cookies to improve
                            browsing experience and analyze website
                            traffic.
                        </p>
                    </div>

                    <div className="privacy-box">
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about our privacy
                            policy, please contact us at
                            yourshop@gmail.com
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};