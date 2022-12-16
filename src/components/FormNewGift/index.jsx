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
}

const FormNuevoRegalo = ({ addRegalo, updateMode, regaloToUpdate, updateRegalo }) => {
  const [ regalo, setRegalo ] = useState(DEFAULT_REGALO);
  const [ error, setError ] = useState('')

 
  useEffect(()=> {
    setRegalo(updateMode ? regaloToUpdate : DEFAULT_REGALO)
  }, [updateMode])

  const handleChange = (e)=> {
    setRegalo(prev=> ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e)=> {
    e.preventDefault()

    if(!regalo.nombre.trim()) return setError('Ingrese un nombre para el regalo');
    if(!regalo.destinatario.trim()) return setError('Ingrese un destinatario para el regalo');

    if(updateMode){
      console.log('update');
      updateRegalo(regalo)
    } else {
      console.log('add');
      addRegalo(regalo)
    }    

    setRegalo(DEFAULT_REGALO)
    setError('')
  }

  useEffect(()=> {
    const timeoutId = setTimeout(()=> {
      if(error !== ''){
        setError('')
      }
    }, 3000)

    return ()=> clearTimeout(timeoutId)
  }, [error])

  const disabledBtn = !Boolean(cleanStr(regalo.nombre)) || regalo.cantidad < 0 || !Boolean(cleanStr(regalo.destinatario));

  const handleRegaloAleatorio = ()=> {
    const algunosRegalos = ['Medias', 'Carbon', 'PC','Grafica','Auriculares', 'Notebook']

    setRegalo((prev) => ({
      ...prev,
      nombre: algunosRegalos[getNumberRandom(0, algunosRegalos.length - 1)],
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-new-regalo" >

        <button type='button' onClick={handleRegaloAleatorio}> Sorprendeme! </button>

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

        <Button type="submit" disabled={disabledBtn}  >
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
  
      {cleanStr(regalo.nombre) && cleanStr(regalo.destinatario) && (
        <div className="preview regalos-list__item">
          <ListItem
            isPreview
            nombre={regalo.nombre}
            cantidad={regalo.cantidad}
            imgURL={regalo.imgURL}
            destinatario={regalo.destinatario}
          />
        </div>
      )}

    </>
  );
};

export default FormNuevoRegalo;
