import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { set, useForm } from 'react-hook-form'

function Signup() {
    const [error, setError] = useState("");
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const {register, handleSubmit}= useForm();

    const createAccount= async(data)=>{
        try {
            setError("");
        const userData=   await authService.createAccount(data);
        if(userData){
            const currentUser= await authService.getCurrentUser();
            if(currentUser){
                dispatch(login({userData}))
                navigate("/");
            }
         }
            
        } catch (error) {
            setError(error.message);
        }
    }
  return (
     <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit(createAccount)}>
                    <div className='space-y-5'>
                        <Input
                        label="Name"
                        placeholder="Enter your name"
                        {...register("name",{
                            required:true,
                        })} 
                        />

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
                            required:true
                        })}
                      />     

                      <Button className='w-full' type='submit'>
                        Create Account
                    </Button>              

                    </div>
                </form>
                </div>
                </div>
  )
}

export default Signup