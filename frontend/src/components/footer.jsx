import { useContext } from 'react';
import { userContext } from "./user-context.jsx";
import { Link } from 'react-router-dom';

const Footer = () => {
    const { loggedIn, checkLogin, username } = useContext(userContext);
    checkLogin();

    return (
        <footer className="footer">
            <div className="footerabove ">

                <div className="footer-section">
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/about">About</Link>
                    <Link to="/faq">FAQs</Link>
                </div>

                <div className="footer-section social-links">
                    <a href="https://www.instagram.com/himalayaninstitution" target="_blank" rel="noreferrer">Instagram</a>
                    <a href="https://www.facebook.com/himalayangroupkalaamb/" target="_blank" rel="noreferrer">Facebook</a>
                    <a href="mailto:info@hgpi.in">Email</a>
                </div>
            </div>
            <div className="footerbelow ">
                <div className="footer-section">
                    <p>© 2025 <strong>HIET</strong> — Empowering Future Innovators</p>
                </div>
            </div>

        </footer>
    );
};
export default Footer;
