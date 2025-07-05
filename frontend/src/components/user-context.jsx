import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import backend from '../assets/backend.jsx';
const userContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const checkLogin = async () => {
        try {
            const res = await axios.get(`${backend}/loggedin`, { withCredentials: true });
            setLoggedIn(res.data.success);
            setUsername(res.data.fullname)
        } catch (error) {
            console.log("Not logged in ")
            setLoggedIn(false);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <userContext.Provider value={{ loggedIn, setLoggedIn, username, setUsername, checkLogin }}>
            {children}
        </userContext.Provider>
    );
};

export { userContext }
