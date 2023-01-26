import { useState } from 'react'

const useToggle = () => {
  const [bool, setToggle] = useState(false)

  const toggle = ()=> setToggle(prevBool=> !prevBool)

  return { bool, toggle }

}

export default useToggle