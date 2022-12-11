import Button from "../Button";
import { Gift, NoGift, TrashIcon } from "../Icons";
import "./style.css";

const ListRegalos = ({ regalos, extractKey, renderItems, deleteAll }) => {
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
          </div>
        </>
      ) : (
        <>
          <div className="regalos-list-header">
            <p className="regalos-list-count"> 
              <Gift />
              {regalos.length} {regalos.length === 1 ? "regalo" : "regalos"}
            </p>
            <Button
              onClick={deleteAll}
              className='delete-all'
            >
              <TrashIcon width='18' height='18' />
              <span> Eliminar todo </span>
            </Button>

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
