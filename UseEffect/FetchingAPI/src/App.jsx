import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {setData(data),
      setLoading(false)
    });

  }, [])

  return (
    <>
      {Loading?(
        <h1>Loading...</h1>
      ):(
        <div>
          {data.map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
