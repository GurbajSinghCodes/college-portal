import { useContext, useRef, useEffect } from 'react'
import { userContext } from './user-context'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { VenetianMask, IdCardLanyard } from 'lucide-react'
const Login = () => {
    const { loggedIn, checkLogin } = useContext(userContext)
    const formRef = useRef();
    useEffect(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    if (loggedIn) {
        return (
            <div className='alreadyLoggedIn'>
                Already Logged in
            </div>
        )
    }
    return (
        <div className='loginmain' ref={formRef}>
            <div className="logincontainer">
                <span id='welcome'>Welcome</span>
                <div className="buttonSection">

                    <NavLink className={({ isActive }) => `loginheads ${isActive ? "active-login" : ""}`} to="signin" >
                        <VenetianMask className='imageIcon' />
                        <span>LOGIN</span></NavLink>
                    <NavLink className={({ isActive }) => `loginheads ${isActive ? "active-login" : ""}`} to="signup"  >
                        <IdCardLanyard className='imageIcon' />
                        <span>SIGNUP</span> </NavLink>
                </div>
                <div className='formsection'>

                    <Outlet />
                </div>
            </ div >
        </div>

    )
}

export default Login
