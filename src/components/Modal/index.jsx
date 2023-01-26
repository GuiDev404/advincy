import { useEffect } from 'react'
import ReactDOM from 'react-dom'

const ModalPortal = ({ children }) => {
  const portalContainer = document.createElement('#modal');

  useEffect(()=> {
    document.body.appendChild(portalContainer)

    return ()=> {
      portalContainer.remove();
    }
  }, [portalContainer])

  return ReactDOM.createPortal(children, portalContainer);
}

export default ModalPortal 