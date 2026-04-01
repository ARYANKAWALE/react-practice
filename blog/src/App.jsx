import React from 'react'

const App = () => {
  console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <div>
      <h2>Appwrite URL: {import.meta.env.VITE_APPWRITE_URL}</h2>
    </div>
  )
}

export default App