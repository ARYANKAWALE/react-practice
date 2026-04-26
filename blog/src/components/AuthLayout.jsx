import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? (
    <div className="flex items-center justify-center min-h-[50vh] relative z-10">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#ae7aff]/30 border-t-[#ae7aff] rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  ) : <>{children}</>
}
