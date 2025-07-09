import { CloudOff } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
    return (
        <div style={{
            margin: '30px',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'bradley hand ITC,monospace',
            textAlign: 'center'
        }} >
            <img src="svg/broken-link-icon.svg" alt="" height={'50px'} /><br />
            <span>
                Make sure you have typed in the url correctly. Click&nbsp; <Link to="/"  > here </Link>&nbsp;to go to Homepage
            </span>
        </div>
    )
}

export default NotFound
