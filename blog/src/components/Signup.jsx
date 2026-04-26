import React , { useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()

    const create = async(data)=>{
        setError("")
        try {
            const userData = await authService.createAccount(data);
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login({userData}));
                    navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center w-full min-h-[70vh] px-4 relative z-10">
      <div className="glass-form w-full max-w-md p-6 sm:p-10 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#ae7aff] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#ae7aff]/20">
            B
          </div>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-2">
          Create an account
        </h2>
        <p className="text-center text-sm text-slate-500 mb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#ae7aff] hover:text-[#c4a0ff] font-medium transition-colors"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <div className="mb-6 p-3 rounded-[10px] bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => 
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
