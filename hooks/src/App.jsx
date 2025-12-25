import { useState } from 'react'
import './App.css'

function App() {
  let [count, setCount] = useState(0)
  let [message, setMessage] = useState("")

  const IncreaseValue = () => {
    if(count >=20){
      setMessage("Can't exceed value more than 20")
      return
    }
    setMessage("")
    setCount(count + 1)
  }

  const decreaseValue = () => {
    if (count <= 0) {
      return
    }
    setMessage("")
    setCount(count - 1)
  }

  const resetValue = () => {
    setMessage("")
    setCount(0)
  }

  return (
    <>
      <div>
        <h1>Count: {count}</h1>
        <p>{message}</p>
        <button onClick={IncreaseValue}>Increase</button>
        <button onClick={decreaseValue}>Decrease</button>
        <button onClick={resetValue}>Reset</button>
      </div>
    </>
  )
}

export default App
