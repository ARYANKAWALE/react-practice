import { useState ,useEffect} from 'react'
import './App.css'

function App() {
  const [second, setSeconds] = useState(0)

  useEffect(()=>{
    const Interval = setInterval(()=>{
      console.log("Interval Excuted",second)
      setSeconds(prev => prev + 1)
    }, 1000)
    console.log("time to stop")
    return () => clearInterval(Interval)
  },[])

  return (
    <>
      <h1>{second}</h1>
    </>
  )
}

export default App
