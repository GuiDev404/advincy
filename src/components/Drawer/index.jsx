import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import IconButton from '../IconButton'
import { DeleteIcon } from '../Icons'
import './style.css'
const SIZES = {
  sm: 400,
  md: 450,
  lg: 500,
}

const Drawer = ({ show = false, title, children, footerContent, size = 'md', closeDrawer } = {}) => {
  const drawerConfig = { 
    width: SIZES[size] ?? SIZES['md'],
  }

  const drawerRef = useRef(null);

  useEffect(()=> {
    drawerRef.current.focus()
  }, [])
 

  useEffect(() => {
    const handleCloseEscape = (e)=> {
      const isEscape = e.key === 'Escape';

      (isEscape) && closeDrawer()
    }

    window.addEventListener('keydown', handleCloseEscape);
    
    return () => {
      window.removeEventListener('keydown', handleCloseEscape);
    }
  }, [])
  
  
  const drawerWrapperConfig = { 
    display: show ? 'flex': 'none',
  }

  const handleClose = (e)=> {
    e.target.classList.contains("drawer_wrapper") && closeDrawer()
  }

  const drawerContainer = document.getElementById('drawer')

  // tabIndex='-1' para que sea focusable con javascript y de ahi poder pasar a los otros usando el teclado
  return ReactDOM.createPortal(
    <div className="drawer_wrapper" style={drawerWrapperConfig} ref={drawerRef} onClick={handleClose} tabIndex='-1'>
      <section className="drawer" style={drawerConfig}>
        <header className="drawer_header">
          <h2> {title} </h2>

          <IconButton
            onClick={closeDrawer}
            icon={<DeleteIcon width='20' height='20' />}
            className='drawer__close'
          />
        </header>

        <main className="drawer_body">{children}</main>

        <footer className="drawer_footer">{footerContent ?? ''}</footer>
      </section>
    </div>,
    drawerContainer
  );
}

export default Drawer