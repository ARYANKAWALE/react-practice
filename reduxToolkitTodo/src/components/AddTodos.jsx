import React, { useState } from 'react'
import { useDispatch} from "react-redux"
import {addTodo} from "../features/todo/todoSlice"

const [input, setInput] = useState("")
const dispatch = useDispatch()

const addTodoHandler =(e)=>{
    e.preventDefault()
    dispatch(addTodo(input))
    setInput("")
}

const AddTodos = () => {
  return (
    <div>
        <form onSubmit={addTodoHandler} className='space-x-3 mt-12'>
            <input type="text"
             className='bg-gray-rounded border border-gray-700 foucs:border-indigo-500 text-base
             outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
             placeholder='Enter a Todo...'
             value={input}
             onChange={(e)=>setInput(e.target.value)} />
        </form>
    </div>
  )
}

export default AddTodos