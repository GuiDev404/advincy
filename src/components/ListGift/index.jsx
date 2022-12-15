import React from "react";
import IconButton from "../IconButton";
import { DeleteIcon, PencilIcon } from "../Icons";
import placeholder from "../../assets/placeholder_no_img.png";
import "./style.css";

const ListItem = ({
  deleteRegalo,
  updateUIRegalo,
  id,
  nombre,
  cantidad,
  imgURL,
  destinatario,
  isPreview,
} = {}) => {

  const handleDelete = () => deleteRegalo(id);

  const handleUpdate = () =>
  updateUIRegalo({
      id,
      nombre,
      cantidad,
      imgURL,
      destinatario,
    });

  return (
    <>
      <div className="left" >
        
          <img
            src={Boolean(imgURL) ? imgURL : placeholder}
            width={45}
            height={35}
            alt={nombre}
            className="item__img"
          />
        

        <div className="item__data">
          <p className="item__name"  title={nombre}>
            {nombre} 
          </p>
          <small className="item__destinatario"> {destinatario} </small>
        </div>
      </div>
    
      <div className="right">
        <span className="item__cantidad"> 
          {cantidad} {cantidad > 1 ? "regalos" : "regalo" } 
        </span>

        {!isPreview && (
          <div>
            <IconButton
              icon={<PencilIcon width="14" height="14" />}
              onClick={handleUpdate}
              className="item__update"
            />

            <IconButton
              icon={<DeleteIcon width="14" height="14" />}
              onClick={handleDelete}
              className="item__delete"
            />
          </div>
        )}

      </div>


    </>
  );
};

export default React.memo(ListItem);
