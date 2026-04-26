import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
      className="w-full md:w-auto text-left md:text-center px-3.5 py-3 md:py-2 text-sm font-medium text-slate-400 hover:text-rose-300 md:hover:text-rose-200 rounded-[10px] hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn
