import React from 'react'
import { useEffect,useState } from 'react'
import { set } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({children ,authentication='true'}) {
    const navigate= useNavigate();
    const [loading,setLoading]= useState(true);
    const userStatus= useSelector(state=>state.auth.status)

useEffect(()=>{
    if(authentication && userStatus !==authentication)
    {
        navigate('/login')

    }else if(!authentication && userStatus !==authentication){
        navigate('/');
    }
    setLoading(false);
},[authentication,userStatus,navigate])

return (
    loading ? <h2 className='text-center text-2xl font-bold'>Loading...</h2> : <>{children}</>
)
}

