import React, { useState } from 'react'
import { useEffect } from 'react';

const getDataStorage = (key)=> JSON.parse(localStorage.getItem(key))
const setDataStorage = (key, data)=> localStorage.setItem(key, JSON.stringify(data))

const useStorage = ({ initialState, key }) => {
  const [storage, setStorage] = useState(()=> {
    return getDataStorage(key) ?? initialState
  });

  // const addData = data => {
  //   setDataStorage(key, data)

  //   setStorage(getDataStorage(key))
  // }

  const handleSetStorage = (dataOrFn)=>{
    setStorage(dataOrFn)
  }

  useEffect(()=> {
    setDataStorage(key, storage)
  }, [storage])

  return {
    storage,
    handleSetStorage
    // addData
  }
}

export default useStorage