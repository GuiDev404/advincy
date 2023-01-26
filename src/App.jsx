import { useState } from "react";
import { nanoid } from 'nanoid';

import FormNuevoRegalo from "./components/FormNewGift";
import Header from "./components/Header";
import ListItem from "./components/ListGift";
import ListRegalos from "./components/ListGifts";
import Drawer from "./components/Drawer";
import Loader from "./components/Loader";
import Button from "./components/Button";

import useRegalos from "./hooks/useRegalos";
import useDrawer from "./hooks/useDrawer";

function App() {
  const {isLoading, regalos, error, updateDbRegalo, deleteDbRegalo, addDbRegalo, deleteDbAllRegalos} = useRegalos()
  
  const [updateMode, setUpdateMode] = useState(false);
  const [regaloToUpdate, setRegaloToUpdate] = useState(null);

  const { show: showForm, closeDrawer: closeDrawerForm, showDrawer: showDrawerForm } = useDrawer()
  const { show: showComprar, closeDrawer: closeDrawerComprar, showDrawer: showDrawerComprar } = useDrawer()
  
  const handlePrint = ()=> window.print()

  const onCloseDrawer = ()=> {
    setUpdateMode(false);
    setRegaloToUpdate(null);
  }

  const duplicateUIRegalo = (regaloSelected)=> {
    setRegaloToUpdate(regaloSelected)
    showDrawerForm();
  }

  const updateUIRegalo = (regaloSelected)=> {
    setUpdateMode(true);
    setRegaloToUpdate(regaloSelected)
    showDrawerForm();
  }

  const updateRegalo = (regalo)=> {
    updateDbRegalo(regalo)
    onCloseDrawer();
    closeDrawerForm()
  }

  const addRegalo = (regalo) => {
    const newRegalo = { 
      ...regalo,
      id: nanoid()
    };

    addDbRegalo(newRegalo)
  };
 
  return (
    <section className="regalos-container">
      {showForm && <Drawer
        title="Complete el formulario"
        show={showForm}
        closeDrawer={closeDrawerForm}
        onCloseDrawer={onCloseDrawer}
      >
        <FormNuevoRegalo 
          addRegalo={addRegalo}
          updateRegalo={updateRegalo}
          updateMode={updateMode}
          regaloToUpdate={regaloToUpdate}
        />
      </Drawer>}

      <Drawer
        title='Comprar'
        show={showComprar}
        closeDrawer={closeDrawerComprar}
      >
        <ListRegalos
          isPreview
          regalos={regalos}
          extractKey={(regalo) => regalo.id}
          renderItems={(regalo) => (
            <ListItem
              id={regalo.id}
              nombre={regalo.nombre}
              cantidad={regalo.cantidad}
              precio={regalo.precio}
              imgURL={regalo.imgURL}
              destinatario={regalo.destinatario}
              isPreview
            />
          )}
        />

        <Button
          className='btn__print'
          onClick={handlePrint}
        >
          Imprimir
        </Button>

      </Drawer>

      <Header 
        title={"Regalitos"}
        subtitle="Agregue todos los regalos que deseas para estas fiestas 🎁"
      />

    
      {isLoading
        ? <Loader />
        : <ListRegalos
            regalos={regalos}
            extractKey={(regalo) => regalo.id}
            renderItems={(regalo) => (
              <ListItem
                id={regalo.id}
                nombre={regalo.nombre}
                cantidad={regalo.cantidad}
                precio={regalo.precio}
                imgURL={regalo.imgURL}
                destinatario={regalo.destinatario}
                deleteRegalo={deleteDbRegalo}
                updateUIRegalo={updateUIRegalo}
                duplicateUIRegalo={duplicateUIRegalo}
              />
            )}
            deleteAll={deleteDbAllRegalos}
            showDrawer={showDrawerForm}
            showDrawerComprar={showDrawerComprar}
          />
      }
    </section>
  );
}

export default App;
