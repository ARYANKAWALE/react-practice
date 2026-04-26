import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-2.5 text-sm font-medium text-slate-200 tracking-tight' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`dark-input w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input