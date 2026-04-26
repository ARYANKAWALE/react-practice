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
      className='w-full md:w-auto text-left md:text-center px-4 py-3 md:py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-[10px] transition-all duration-200 cursor-pointer'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn
