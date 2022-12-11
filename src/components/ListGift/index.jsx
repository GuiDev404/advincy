import React from 'react';
import IconButton from '../IconButton';
import { DeleteIcon } from '../Icons';
import './style.css'
import placeholder from '../../assets/placeholder_no_img.png'

const ListItem = ({ id, name, deleteRegalo, quantity, imgUrl } = {}) => {

  const handleDelete = ()=> deleteRegalo(id)

  return (
    <>
      <img src={Boolean(imgUrl) ? imgUrl : placeholder} width={40} height={30}   alt={name} className='item__img'  />
      <span className="item__name"> {name} ({quantity})</span>
      <IconButton 
        icon={<DeleteIcon width="14" height="14" />}
        onClick={handleDelete}
        className="item__delete"
      />

      {/* <button type="button" onClick={handleDelete} className="item__delete">
        <DeleteIcon width="14" height="14" />
      </button> */}
    </>
  );
};

export default React.memo(ListItem);
