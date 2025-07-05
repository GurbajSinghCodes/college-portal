import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
import backend from "../assets/backend.jsx";
import { userContext } from "./user-context.jsx";
const Navbar = ({ menuOpen, setMenuOpen }) => {
    const navigate = useNavigate();
    const { loggedIn, setLoggedIn, checkLogin, username } = useContext(userContext);
    const [count, setCount] = useState(false);

    useEffect(() => {

        checkLogin();
    }, [count]);

    const handleLogout = async () => {
        try {
            await axios.post(`${backend}/logout`, {}, { withCredentials: true });
            setLoggedIn(false);
            toast.success("Logged out successfully !")
            navigate('/')

        } catch (err) {
            toast.error("Logout Failed")
            console.error("Logout failed:", err);
        }
    };
    return (

        <nav className="navbar" onClick={(e) => e.stopPropagation()}>
            <div className="logo">  <span id="heading">HIET</span>
            </div>
            <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>


            <ul className={`nav-links ${menuOpen ? "open" : ""}`} onClick={() => { setCount(!count); setMenuOpen(!menuOpen) }} >


                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
                </li>
                <li className="">
                    <NavLink to="/notes" className={({ isActive }) => isActive ? "active-link" : ""}>Notes</NavLink>
                </li >
                <li>
                    <NavLink to="/qps" className={({ isActive }) => isActive ? "active-link" : ""}>Question Papers</NavLink>
                </li>
                <li>
                    <NavLink to="/starred" className={({ isActive }) => isActive ? "active-link" : ""}>Starred</NavLink>
                </li>

                <li className="loginout" >
                    {loggedIn ? (
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    ) : (
                        <NavLink to="/login">Login</NavLink>

                    )}
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;
