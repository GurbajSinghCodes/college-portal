import { useContext } from 'react';
import { userContext } from "./user-context.jsx";
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Contact, LucideBadgeHelp, Info } from "lucide-react"

const Footer = () => {
    const { loggedIn, checkLogin, username } = useContext(userContext);
    checkLogin();

    return (
        <footer className="footer">
            <div className="footerabove ">

                <div className="footer-section">
                    <Link to="/contact"><Contact className='footerIcon' /> Contact Us</Link>
                    <Link to="/about"><Info className='footerIcon' /> About</Link>
                    <Link to="/faq"><Contact className='footerIcon' />FAQs</Link>
                </div>

                <div className="footer-section social-links">
                    <a href="https://www.instagram.com/himalayaninstitution" target="_blank" rel="noreferrer">  <Instagram className='footerIcon' /> Instagram</a>
                    <a href="https://www.facebook.com/himalayangroupkalaamb/" target="_blank" rel="noreferrer"><Facebook className='footerIcon' />Facebook</a>
                    <a href="mailto:info@hgpi.in"><Mail className='footerIcon' /> Email</a>
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
