import { useState } from 'react'
import './App.css'
import Login from './Component/Login'
import Logout from './Component/Logout'

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(true)

return(
  <div>
    <p>Welcome</p>
    {isLoggedin && <Logout/>}
  </div>





  // <div>
  //   {isLoggedin ? <Logout/> : <Login />}
  // </div>
)

//  if(isLoggedin){
//   return (
//         <Login />
//   )
//   }else{
//         return(
//           <Logout/>
//         )
//       }
}

export default App
