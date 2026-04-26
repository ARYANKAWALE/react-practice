import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = '',
    textColor = '',
    className = '',
    ...props
}) {
  return (
    <button className={`gradient-btn ${className}`} type={type} {...props}>
        {children}
    </button>
  )
}
export default Button