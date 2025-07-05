import { useContext } from 'react';
import { userContext } from "./user-context.jsx";
import { Link } from 'react-router-dom'

const Footer = () => {
    const { loggedIn, setLoggedIn, checkLogin, username } = useContext(userContext);
    checkLogin()
    return (

        <footer className="footer">
            <p id='footer-contact-us'>
                <Link to='/contact'> Contact Us</Link>
            </p>
            <p>&copy; 2025 HIET. All rights reserved</p>
            <span className={`username ${loggedIn ? 'border' : ''}`}>  {loggedIn ? `Signed in as : ${username}` : ""}</span>

        </footer>

    )
}

export default Footer
