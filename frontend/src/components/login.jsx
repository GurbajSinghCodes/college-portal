import { useEffect, useState, useContext } from 'react'
import { userContext } from './user-context'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { VenetianMask, IdCardLanyard } from 'lucide-react'
const Login = () => {
    const { loggedIn, checkLogin } = useContext(userContext)
    if (loggedIn) {
        return (
            <div className='alreadyLoggedIn'>
                Already Logged in
            </div>
        )
    }
    const [moveUp, setMoveUp] = useState(false)
    const location = useLocation()
    const handleClick = () => {
        setMoveUp(true)
    }
    useEffect(() => {
        if (location.pathname == '/login' || location.pathname == '/login/') {
            setMoveUp(false)
        }
        else {
            setMoveUp(true)
        }
    }, [location.pathname])
    useEffect(() => {
        if (location.pathname.includes('verify-otp') || location.pathname.includes('passwordlogin')) {
            const formSection = document.getElementById('formsection');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.pathname]);

    return (
        <div className='loginmain' >

            <div className={`buttonSection  ${moveUp ? "moved-up" : ""}`}>

                <section className='loginheads'>
                    <Link to="verify-otp" onClick={handleClick}>
                        <VenetianMask className='imageIcon' />
                        <big>Login using OTP</big> <small>Create new account/ Log into existing account</small></Link>
                </section>
                <section className='loginheads' >
                    <Link to="passwordlogin" onClick={handleClick} >
                        <IdCardLanyard className='imageIcon' />
                        <big>Login using Password</big> <small>Requires an existing account</small></Link>
                </section>
            </div>
            <div id='formsection'>

                <Outlet />
            </div>
        </ div >

    )
}

export default Login
