import React from 'react';
import '../styles/navigation.css'
import {useNavigate} from 'react-router-dom'
import jwt from 'jsonwebtoken'

function Navigationbar(props){
    const navigate = useNavigate()
    function logoutUser(){
        localStorage.removeItem('token')
        navigate('/login')
    }
    const user = jwt.decode(props.token)
    const name = user.username
    return (
        <div className="grid-container">
            <header className="header">
            <div className="brand">
                <h1>TrackPay</h1>
            </div>
            <div className="header-links">
                <div className="uname">{name}
                <button className="logoutbutton" onClick={logoutUser}>Logout</button>
                </div>
            </div>
        </header>
        </div>
    )

}

export default Navigationbar;