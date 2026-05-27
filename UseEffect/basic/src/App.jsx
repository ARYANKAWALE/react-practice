import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // useEffect(()=>{
  //   alert('Count has been updated')
  // })

  useEffect(()=>{
    alert("Count is update")
    return()=>{
      alert("count is unmounted")
    }
  })

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={handleClick}>Update Count</button>
    </>
  )
}

export default App
