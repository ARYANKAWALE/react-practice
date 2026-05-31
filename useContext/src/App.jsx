import { createContext, useState } from 'react'
import './App.css'
import CardA  from './component/CardA'

const ThemeContext = createContext()
function App() {

  const [name, setName] = useState({ name: 'aryan' })
  const [theme,setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div id="Container" 
      style={{backgroundColor:theme==='light'?'beige':'black',
        color:theme==='light'?'black':'white'}}>
      <CardA/>
      </div>
    </ThemeContext.Provider>
  )
}

export {ThemeContext}
export default App
