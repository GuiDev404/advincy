import { useCallback, useState, useEffect } from "react";
import { nanoid } from 'nanoid';

import FormNuevoRegalo from "./components/FormNewGift";
import Header from "./components/Header";
import ListItem from "./components/ListGift";
import ListRegalos from "./components/ListGifts";
import useStorage from "./hooks/useStorage";
import Drawer from "./components/Drawer";
import { cleanStr } from "./helpers";

const REGALOS_INICIALES = [
  // { id: 1, name: "Celular" },
  // { id: 2, name: "Plata" },
  // { id: 3, name: "Juego Steam" },
];

function App() {
  const [show, setShow] = useState(false);
  const { storage: regalos, handleSetStorage: setRegalos  } = useStorage({
    initialState: REGALOS_INICIALES,
    key: 'regalos'
  });
  
  const [updateMode, setUpdateMode] = useState(false);
  const [regaloToUpdate, setRegaloToUpdate] = useState(null);

  const updateUIRegalo = (regaloSelected)=> {
    setUpdateMode(true);
    setRegaloToUpdate(regaloSelected)
    showDrawer();
  }

  const updateRegalo = (regalo)=> {
    setRegalos(regalos=> regalos.map(r=> r.id === regalo.id ? regalo : r))
    closeDrawer()
  }

  const addRegalo = (regalo) => {

    const newRegalo = { 
      id: nanoid(),
      ...regalo
    };

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

  };

  const deleteRegalo = useCallback((id)=> {
    setRegalos(prevRegalos=> prevRegalos.filter(regalo=> regalo.id !== id))
  }, [])

  const deleteAll = useCallback(()=> {
    const respuesta = confirm('Desea eliminar todos los regalos?')
    respuesta && setRegalos(REGALOS_INICIALES);
  }, [])

  const closeDrawer = useCallback(()=>{    
    setShow(false);
    setUpdateMode(false);

    setRegaloToUpdate(null);
  }, [])
  
  const showDrawer = useCallback(()=>{
    setShow(true)
  }, [])

  return (
    <section className="regalos-container">
      {show && <Drawer
        title="Complete el formulario"
        show={show}
        closeDrawer={closeDrawer}
      >
        <FormNuevoRegalo 
          addRegalo={addRegalo}
          updateRegalo={updateRegalo}
          updateMode={updateMode}
          regaloToUpdate={regaloToUpdate}
        />
      </Drawer>}

      <Header 
        title={"Regalitos"}
        subtitle="Agregue todos los regalos que deseas para estas fiestas 🎁"
      />

      <ListRegalos
        regalos={regalos}
        extractKey={(regalo) => regalo.id}
        renderItems={(regalo) => (
          <ListItem
            id={regalo.id}
            nombre={regalo.nombre}
            cantidad={regalo.cantidad}
            imgURL={regalo.imgURL}
            destinatario={regalo.destinatario}
            deleteRegalo={deleteRegalo}
            updateUIRegalo={updateUIRegalo}
          />
        )}
        deleteAll={deleteAll}
        showDrawer={showDrawer}
      />
    </section>
  );
}

export default App;
