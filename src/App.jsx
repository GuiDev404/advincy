import { useCallback, useState, useEffect } from "react";
import { nanoid } from 'nanoid';

import FormNuevoRegalo from "./components/FormNewGift";
import Header from "./components/Header";
import ListItem from "./components/ListGift";
import ListRegalos from "./components/ListGifts";
import useStorage from "./hooks/useStorage";

const REGALOS_INICIALES = [
  // { id: 1, name: "Celular" },
  // { id: 2, name: "Plata" },
  // { id: 3, name: "Juego Steam" },
];

function App() {
  const { storage: regalos, handleSetStorage: setRegalos  } = useStorage({
    initialState: REGALOS_INICIALES,
    key: 'regalos'
  })
  
  // const [regalos, setRegalos] = useState(storage);
  
  // useEffect(()=> {
  //   addData(regalos)
  // }, [regalos])

  const addRegalo = (nombreRegalo, cantidad, img) => {

    const newRegalo = { 
      id: nanoid(),
      name: nombreRegalo,
      quantity: cantidad,
      img: img
    };

    const exist = regalos.find(r=> r.name.toLowerCase().trim() === nombreRegalo.toLowerCase().trim());
   
    if(exist){
      setRegalos(prev=> prev.map(regalo=> {
        return exist.id === regalo.id ? ({ ...regalo, quantity: Number(regalo.quantity) + cantidad }) : regalo
      }));
    } else {
      setRegalos(prev=> [...prev, newRegalo]);
    }

  };

  const deleteRegalo = useCallback((id)=> {
    setRegalos(prevRegalos=> prevRegalos.filter(regalo=> regalo.id !== id))
  }, [])

  const deleteAll = useCallback(()=> {
    const respuesta = confirm('Desea eliminar todos los regalos?')
    respuesta && setRegalos(REGALOS_INICIALES);
  }, [])


  return (
    <section className="regalos-container">
      <Header 
        title={"Regalitos"}
        subtitle="Agregue todos los regalos que deseas para estas fiestas 🎁"
      >
        <FormNuevoRegalo addRegalo={addRegalo} regalos={regalos} />
      </Header>

      <ListRegalos
        regalos={regalos}
        extractKey={(regalo) => regalo.id}
        renderItems={(regalo) => (
          <ListItem
            id={regalo.id}
            name={regalo.name}
            quantity={regalo.quantity}
            imgUrl={regalo.img}
            deleteRegalo={deleteRegalo}
          />
        )}
        deleteAll={deleteAll}
      />
    </section>
  );
}

export default App;
