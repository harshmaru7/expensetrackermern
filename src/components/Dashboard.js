import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import {useNavigate} from 'react-router-dom';
import Navigationbar from './Navigation';
import Expense from './expense';

function Dashboard(){

    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            }
            // else{
            //     getBlogs()
            // }
        }
    },[])

    const token = localStorage.getItem('token')
    const user = jwt.decode(token)
    const name = user.username

    return (
        <div>
        <Navigationbar username={name} token={token}/>
        <Expense/>
        </div>

    )
}

export default Dashboard