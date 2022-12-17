import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { cleanStr, getNumberRandom } from "../../helpers";
import Button from "../Button";
import IconButton from "../IconButton";
import { AddIcon } from "../Icons";
import ListItem from "../ListGift";
import './style.css'

const DEFAULT_REGALO = {
  nombre: '',
  cantidad: 1,
  imgURL: '',
  destinatario: '',
  precio: 1,
}

const FormNuevoRegalo = ({ addRegalo, updateMode, regaloToUpdate, updateRegalo }) => {
  const [ regalo, setRegalo ] = useState(DEFAULT_REGALO);
  const [ error, setError ] = useState('')

  const validations = [
    !Boolean(cleanStr(regalo.nombre)),
    !Boolean(cleanStr(regalo.destinatario)),
    !Boolean(cleanStr(regalo.precio)),
    !Boolean(cleanStr(regalo.cantidad)),
    regalo.cantidad <= 0,
    regalo.precio <= 0
  ]

  const nonValidGift = validations.includes(true);

  useEffect(()=> {
    setRegalo(updateMode ? regaloToUpdate : DEFAULT_REGALO)
  }, [updateMode])
  
  useEffect(()=> {
    const [ isEmptyName, isEmptyDest, isEmptyPrice, isEmptyCant, isValidCant, isValidPrice ] = [...validations];

    if (isEmptyName)
      return setError("Ingrese un nombre para el regalo");
    if (isEmptyDest)
      return setError("Ingrese un destinatario para el regalo");
    if (isEmptyCant || isValidCant)
      return setError("Ingrese una cantidad de regalos");
    if (isEmptyPrice || isValidPrice)
      return setError("Ingrese un precio para el regalo");

  }, [validations])

  const handleChange = (e)=> {

    setRegalo(prev=> ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const handleSubmit = (e)=> {
    e.preventDefault()

    if(updateMode){
      updateRegalo(regalo)
    } else {
      addRegalo(regalo)
    }    

    setRegalo(DEFAULT_REGALO)
    setError('')
  }

  useEffect(()=> {
    if(!nonValidGift && error !== ''){
      setError('')
    }
    // let timeoutId;

    // error !== '' && clearTimeout(timeoutId)

    // timeoutId = setTimeout(()=> {
    //   if(error !== ''){
    //     setError('')
    //   }
    // }, 3000)

    // return ()=> clearTimeout(timeoutId)
  }, [error, nonValidGift])


  const handleRegaloAleatorio = ()=> {
    const algunosRegalos = ['Medias', 'Carbon', 'PC','Grafica','Auriculares', 'Notebook']

    setRegalo((prev) => ({
      ...prev,
      nombre: algunosRegalos[getNumberRandom(0, algunosRegalos.length - 1)],
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-new-regalo">
        <Button type="button" onClick={handleRegaloAleatorio} className='sorprendeme-btn'>
          {" "}
          Sorprendeme!{" "}
        </Button>

        <input
          value={regalo.nombre}
          onChange={handleChange}
          type="text"
          autoComplete="no"
          placeholder="Que vas querer como regalo?"
          className="giftname_input"
          name="nombre"
        />

        <input
          value={regalo.cantidad}
          className="quantity_input"
          onChange={handleChange}
          type="number"
          name="cantidad"
          placeholder="1"
          min={1}
        />

        <input
          value={regalo.precio}
          className="price_input"
          placeholder="ARS $"
          onChange={handleChange}
          type="number"
          name="precio"
          min={1}
        />

        <input
          value={regalo.imgURL}
          autoComplete="no"
          type="text"
          placeholder="Ingrese la url para la imagen"
          className="giftimg_input"
          name="imgURL"
          onChange={handleChange}
        />

        <input
          value={regalo.destinatario}
          autoComplete="no"
          type="text"
          placeholder="Ingrese el destinatario"
          className="giftdest_input"
          name="destinatario"
          onChange={handleChange}
        />

        <Button type="submit" disabled={nonValidGift}>
          <AddIcon
            width="22"
            height="22"
            style={{ marginRight: 5 }}
            strokeWidth="2"
          />
          <span> {updateMode ? "Actualizar" : "Agregar"} regalo </span>
        </Button>

        {error && <p className="error-message"> {error} </p>}
      </form>

      {cleanStr(regalo.nombre) &&
        cleanStr(regalo.destinatario) &&
        parseInt(regalo.precio, 10) > 0 &&
        parseInt(regalo.cantidad, 10) > 0 && (
          <div className="preview regalos-list__item">
            <ListItem
              isPreview
              nombre={regalo.nombre}
              cantidad={regalo.cantidad}
              imgURL={regalo.imgURL}
              destinatario={regalo.destinatario}
              precio={regalo.precio}
            />
          </div>
        )}
    </>
  );
};

export default FormNuevoRegalo;
