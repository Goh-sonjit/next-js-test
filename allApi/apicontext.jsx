import React, { useState,createContext, useReducer } from 'react';
import instance from './axios';
import { getCookie } from 'cookies-next';

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  
  const [show, setShow] = useState(false);
  var [initalState, setInitalState] = useState(0)
  let pdata = getCookie('permissions')

  const item = async () => {
      if(pdata){
        const { data } = await instance.get(`forgetPass`)
        if(data.message == "InValid Token"){
          setInitalState(0);
          return initalState;
        }else{
          setInitalState(data[0].item);
          return initalState;
        }
      }else{
        return initalState
      }
    
}

  const reducer = (state, action) => {
    if (action.type === 'INCR') {
      state = state + 1;
    }
    if (state > 0 && action.type === 'DECR') {
      state = state - 1;
    }

    return state
  };

  const [state, addRemove] = useReducer(reducer, (item()))


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <AccountContext.Provider value={{initalState,  state, addRemove,show, handleClose, handleShow }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider