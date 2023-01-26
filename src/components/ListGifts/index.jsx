import Button from "../Button";
import { AddIcon, Gift, NoGift, TrashIcon } from "../Icons";
import "./style.css";

const ListRegalos = ({ regalos, extractKey, renderItems, deleteAll, showDrawer, showDrawerComprar, isPreview = false } = {}) => {
  return (
    
    <div className="regalos-list-container">
      {Boolean(regalos.length) === false ? (
        <>
          <div className="no-gifts">
            <NoGift 
              width={45}
              height={45}
              className="muted-text"
            />
            <p> No hay regalos deseados. Agrega algunos. </p>

            <Button
                onClick={showDrawer}
                className='add-new-gift'
                style={{ margin: '1rem auto' }}
              >
                <AddIcon width='18' height='18' />
                <span> Agregar regalo </span>
              </Button>
          </div>
        </>
      ) : (
        <>
          <div className="regalos-list-header">
            <div>
              <p className="regalos-list-count"> 
                <Gift />
                {regalos.length} {regalos.length === 1 ? "regalo" : "regalos"}
              </p>
              <p className="regalos-list-count" style={{ margin: '0 .1rem' }}>
                <span style={{ fontSize: '1.1rem' }} > $ </span>
                {regalos.reduce((acc, c)=> {
                  acc += parseInt(c.precio, 10) * parseInt(c.cantidad);
                  return acc
                },0)}
              </p>
            </div>

            {!isPreview &&
            <div className="regalos-list-actions">
              <Button
                onClick={showDrawer}
                className='add-new-gift'
              >
                <AddIcon 
                  width='18'
                  height='18'
                  strokeWidth={2}
                />
                <span> Agregar regalo </span>
              </Button>

              <Button
                onClick={deleteAll}
                className='delete-all'
              >
                <TrashIcon  width='18' height='18' />
                <span> Eliminar todo </span>
              </Button>
           
              <Button
                onClick={showDrawerComprar}
                className='delete-all'
              >
                {/* <TrashIcon  width='18' height='18' /> */}
                <span> Previsualizar </span>
              </Button>
            </div>}

          </div>
          <div className="regalos-list-body">
            {regalos.map((regalo) => (
              <div key={extractKey(regalo)} className="regalos-list__item">
                {renderItems(regalo)}
              </div>
            ))}
          </div>
        
        </>
      )}
    
        </div>
  );
};

export default ListRegalos;
