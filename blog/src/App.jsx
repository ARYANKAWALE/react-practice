import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import { Outlet } from 'react-router-dom'
import authService from "./appwrite/auth.js"
import {login,logout} from "./store/authSlice"
import { Footer, Header } from './components'

const App = () => {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }                                                                     
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className='blog-bg min-h-screen flex flex-col'>
      <Header/>
      <main className='flex-grow relative z-10'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  ) : (
    <div className="blog-bg min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="w-12 h-12 border-4 border-[#ae7aff]/30 border-t-[#ae7aff] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default App