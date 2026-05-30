import { useState } from 'react'
import './App.css'
import Card from './Card'

function App() {
  const [name, setName] = useState('')

  return (
    <>
      <Card name={name} setName={setName}/>
    </>
  )
}

export default App
