import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogout=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch((error)=>{
            console.error("Logout failed:", error);
        });
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={handleLogout}
    >Logout</button>
  )
}

export default LogoutBtn