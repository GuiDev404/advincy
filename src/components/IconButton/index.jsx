import React from 'react'
import Button from '../Button'

const IconButton = ({ icon, ...props }) => {
  return (
    <Button
      {...props}
    >
      {icon}
    </Button>
  )
}

export default IconButton