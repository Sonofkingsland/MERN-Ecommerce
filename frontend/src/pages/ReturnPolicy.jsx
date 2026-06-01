import React from "react";
import "../styles/returnPolicy.css";

export const ReturnPolicy = () => {
    return (
        <section className="return-policy">
            <div className="return-container">
                <h1>Return & Refund Policy</h1>
                <p className="policy-date">
                    Last Updated: May 2026
                </p>

                <div className="policy-content">

                    <div className="policy-box">
                        <h2>Return Eligibility</h2>
                        <p>
                            Products can be returned within
                            <strong> 7 days </strong>
                            of delivery if they are damaged,
                            defective, or incorrect.
                        </p>
                    </div>

                    <div className="policy-box">
                        <h2>Refund Process</h2>
                        <p>
                            Once your returned product is inspected,
                            your refund will be processed within
                            <strong> 5–7 business days </strong>
                            to your original payment method.
                        </p>
                    </div>

                    <div className="policy-box">
                        <h2>Non-Returnable Items</h2>
                        <p>
                            Some items such as personal care products,
                            used items, or customized products may not
                            be eligible for return.
                        </p>
                    </div>

                    <div className="policy-box">
                        <h2>Exchange Policy</h2>
                        <p>
                            You can request an exchange if you receive
                            a damaged or wrong product, subject to
                            stock availability.
                        </p>
                    </div>

                    <div className="policy-box">
                        <h2>Need Help?</h2>
                        <p>
                            If you have questions regarding returns or
                            refunds, contact us at
                            yourshop@gmail.com
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};