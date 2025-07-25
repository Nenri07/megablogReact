import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'
import { Header,Footer } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading]= useState(true)
  const dispatch= useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData)
      {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
   <div className='min-h-screen bg-gray-400 flex flex-wrap content-between'>
    <div className='w-full block'>
      <Header />
        <main>
          <Outlet />
        </main>
      <Footer />  
    </div>
   </div>
  ):null
}

export default App
