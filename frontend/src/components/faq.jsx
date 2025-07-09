import React from "react";

const FAQ = () => {
    const faqs = [
        {
            question: "What is HIETHub?",
            answer:
                "HIETHub is a student portal where you can access academic notes and previous year question papers. It also lets you save important files with the Starred feature.",
        },
        {
            question: "How do I log in?",
            answer:
                "You can log in using your email and password, or request an OTP sent to your registered email for a quick login.",
        },
        {
            question: "How does the Starred feature work?",
            answer:
                "Click on the ⭐ icon next to any file to save it. You can view all your saved files under the 'Starred' tab.",
        },
        {
            question: "Do I need to register separately?",
            answer:
                "The first time you log in with an OTP, your profile is automatically created. Just set your name and password after OTP verification.",
        },
        {
            question: "Why am I logged out after some time?",
            answer:
                "Sessions expire after a set period for security. Make sure to log in again if you're inactive for long.",
        },
        {
            question: "Can I access the portal on mobile?",
            answer:
                "Yes, the portal is responsive and works well on mobile devices too.",
        },
    ];

    return (
        <div className="faq-container">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <h4 className="faq-question">{faq.question}</h4>
                    <p className="faq-answer">{faq.answer}</p>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
