import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
    return (
        <div style={{
            margin: '30px', height: '80vh', width: '100vw', justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: '25px', fontWeight: 'bold', fontFamily: 'bradley hand ITC,monospace', boxSizing: 'border-box'
        }} >
            <img src="svg/broken-link-icon.svg" height={`100px`} alt="" /><br />
            <span>
                Make sure you have typed in the url correctly. Click  <Link to="/"> here </Link>{" "} to go to Homepage
            </span>
        </div>
    )
}

export default NotFound
