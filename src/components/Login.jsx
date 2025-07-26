import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {Input,Logo, Button} from './index'
import authService from '../appwrite/auth'
function Login() {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [error, setError] = useState('');
    const {register,handleSubmit} =useForm();

    const login= async (data)=>{
        try {
            setError("");
            const session= await authService.login(data);
            if(session){
               const userData= await authService.getCurrentUser();
               if(userData) dispatch(authLogin({userData}))
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
     <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input 
                type="email"
                label="Email"
                placeholder='Enter your email'
                {...register("email",{
                    required:true,
                    validate:{
                        matchPattern: (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.
                            test(value) || 
                        "Invalid email format"
                        
                    }
                })}

                />
                <Input
                type="password"
                label="Password"
                placeholder='Enter your password'
                {...register("password",{
                    required:true,
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                })} />
                <Button
                type='submit'
                className='w-full bg-black'
                bgColor='bg-black-500'
                > Sign In</Button>
            </div>
        </form>
    </div> 
    </div>   
  )
}

export default Login