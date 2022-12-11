import React from 'react'

const Button = ({ text , children, type = 'button' , ...props }) => {
  return (
    <button type={type} {...props} >
      {children}
      {text}
    </button>
  )
}

export default Button