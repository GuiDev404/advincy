import React, { useState } from "react";
import { useEffect } from "react";
import IconButton from "../IconButton";
import { AddIcon } from "../Icons";
import './style.css'

const FormNuevoRegalo = ({ addRegalo, regalos }) => {
  const [ regalo, setRegalo ] = useState('')
  const [ cantidad, setCantidad ] = useState(1)
  const [ img, setImg ] = useState('')
  const [ error, setError ] = useState('')

  const handleChange = (e)=> {
    setRegalo(e.target.value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()

    if(!regalo.trim()) return setError('Ingrese un nombre para el regalo');

    addRegalo(regalo, cantidad, img)
    setCantidad(1)
    setImg('')
    setRegalo('')
    setError('')
  }

  const handleCantidad = (e)=> {
    setCantidad(e.target.valueAsNumber)
  }
  
  const handleChangeImg = (e)=> {
    setImg(e.target.value)
  }

  useEffect(()=> {
    const timeoutId = setTimeout(()=> {
      if(error !== ''){
        setError('')
      }
    }, 3000)

    return ()=> clearTimeout(timeoutId)
  }, [error])

  const disabledBtn = !Boolean(regalo) || cantidad < 0;

  return (
    <>
      <form onSubmit={handleSubmit} className="form-new-regalo">
        <input
          value={regalo}
          onChange={handleChange}
          type="text"
          autoComplete="no"
          placeholder="Que vas querer como regalo?"
          className="giftname_input"
          autoFocus
        />
        <input
          value={cantidad}
          className="quantity_input"
          onChange={handleCantidad}
          type="number"
          min={1}
        />

        <IconButton
          type="submit"
          disabled={disabledBtn}
          icon={
            <AddIcon
              width="20"
              height="20"
              style={{ marginTop: "3px" }}
              strokeWidth="2"
            />
          }
        />

<input value={img}  autoComplete="no" type="text" placeholder="Ingrese la url para la imagen" className="giftimg_input" onChange={handleChangeImg} />

        {/* <button type="submit" disabled={disabledBtn}>
          <AddIcon width="24" height="24" style={{ marginTop: '3px'  }}  strokeWidth="2" />
        </button> */}
      </form>
      {error && <p className="error-message"> {error} </p>}
    </>
  );
};

export default FormNuevoRegalo;
