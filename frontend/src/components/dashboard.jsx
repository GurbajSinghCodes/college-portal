import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "./user-context";
import { FaRegTired } from "react-icons/fa";
const Dashboard = () => {
    const { checkLogin, loggedIn, username } = useContext(userContext);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        async function login() {
            await checkLogin()
            setLoading(false)
        }
        login()
    }, [])

    useEffect(() => {
        if (!loading && !loggedIn) {
            navigate("/")
        }

    }, [loading, loggedIn])
    if (loading) return (
        <div>Checking Login Status
        </div>)
    return (<div>Welcome {username} </div>)

}

export default Dashboard;
