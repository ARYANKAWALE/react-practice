import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-2 text-sm font-medium text-slate-300'>{label}</label>}
        <select {...props} id={id} ref={ref} className={`dark-select w-full ${className}`}>
            {options?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)
