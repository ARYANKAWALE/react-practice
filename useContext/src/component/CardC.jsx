import react, { useContext } from 'react'
import { ThemeContext } from '../App'

function CardC(){

    const [theme, setTheme] = useContext(ThemeContext)

    const handleTheme=()=>{
        if(theme === 'light')
            setTheme('dark')
        else
            setTheme('light')
    }
    return(
    <>
    <p>Hello</p>
    <div>
        <button onClick={handleTheme}>
            Change Theme
        </button>
    </div>
    </>
    )
}

export default CardC