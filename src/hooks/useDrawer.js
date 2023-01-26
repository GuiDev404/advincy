import { useCallback } from 'react'
import useToggle from './useToggle'

const useDrawer = ({ initialBool = false } = {}) => {
  const { bool, toggle } = useToggle(initialBool)

  const closeDrawer = useCallback(()=> {
    toggle()
  }, [])
  
  const showDrawer = useCallback(()=>{
    toggle()
  }, [])

  return {
    show: bool,
    closeDrawer,
    showDrawer
  }
}

export default useDrawer