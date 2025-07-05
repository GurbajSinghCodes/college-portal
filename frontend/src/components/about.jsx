import React from "react";

const About = () => {
    return (
        <div className="about">

            <div className="about-page">
                <header className="about-hero">
                    <h1>About HIET</h1>
                    <p>Your gateway to innovation and excellence in engineering education.</p>
                </header>

                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At HIET, we strive to empower students through quality technical education,
                        hands-on learning, and a culture of innovation. We aim to build future-ready
                        engineers with strong ethics and leadership skills.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Why Choose HIET?</h2>
                    <div className="about-features">
                        <div className="feature-card">
                            <img src="/images/lab.jpg" alt="Labs" />
                            <h3>Modern Labs</h3>
                            <p>State-of-the-art laboratories equipped with the latest tools and technologies.</p>
                        </div>
                        <div className="feature-card">
                            <img src="/images/readingroom.jpg" alt="Reading Room" />
                            <h3>Dedicated Reading Rooms</h3>
                            <p>Quiet, focused spaces designed to enhance your study experience and concentration.</p>
                        </div>

                        <div className="feature-card">
                            <img src="/images/placement.jpg" alt="Placements" />
                            <h3>Strong Placements</h3>
                            <p>Excellent placement support and collaborations with top companies.</p>
                        </div>
                    </div>
                </section>

                <section className="about-section vision-section">
                    <h2>Our Vision</h2>
                    <p>
                        To become a leading institution in technical education, shaping individuals into globally competent professionals who contribute positively to society.
                    </p>
                </section>

                <section className="about-section contact-cta">
                    <h2>Connect With Us</h2>
                    <p>Have questions or want to collaborate? <a href="/contact">Get in touch →</a></p>
                </section>
            </div>
        </div>
    );
};

export default About;
