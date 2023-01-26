import { useState, useEffect, useCallback } from 'react'
import { cleanStr } from '../helpers';
import { api } from '../helpers/api';

const REGALOS_INICIALES = [
  // { id: 1, name: "Celular" },
  // { id: 2, name: "Plata" },
  // { id: 3, name: "Juego Steam" },
];

const useRegalos = () => {
  const [loading, setLoading] = useState('init');
  const [regalos, setRegalos] = useState([]);
  const [error, setError] = useState({});

  const isLoading = loading === 'init' || loading === 'loading' 

  useEffect(()=> {
    setLoading('loading')

    api.gift.list()
      .then(response=> response.data)
      .then(setRegalos)
      .catch(setError)
      .finally(()=> setLoading('terminated'))
  }, [])

  useEffect(()=> {
    if(!isLoading) {
      api.gift.save(regalos)
        .catch(console.log)
    }
  }, [regalos, isLoading])
  
  const updateDbRegalo = regalo => {
    setRegalos(regalos=> regalos.map(r=> r.id === regalo.id ? regalo : r))
  }

  const deleteDbRegalo = useCallback((id)=> {
    setRegalos(prevRegalos=> prevRegalos.filter(regalo=> regalo.id !== id))
  }, [])

  const deleteDbAllRegalos = useCallback(()=> {
    const respuesta = confirm('Desea eliminar todos los regalos?')
    respuesta && setRegalos(REGALOS_INICIALES);
  }, [])

  const addDbRegalo = (newRegalo)=> {
    const regaloExistente = regalos.find(({ nombre, destinatario })=> 
      cleanStr(nombre) === cleanStr(newRegalo.nombre) && 
      cleanStr(destinatario) === cleanStr(newRegalo.destinatario)
    );
  
    if(regaloExistente){
      setRegalos((prev) =>
        prev.map((regalo) => {
          return regaloExistente.id === regalo.id
            ? { ...regalo, cantidad: Number(regalo.cantidad) + Number(newRegalo.cantidad) }
            : regalo;
        })
      );
    } else {
      setRegalos(prev=> [...prev, newRegalo]);
    }
  }

  return {
    isLoading,
    regalos, 
    error,
    updateDbRegalo,
    deleteDbRegalo,
    addDbRegalo,
    deleteDbAllRegalos
  }
}

export default useRegalos