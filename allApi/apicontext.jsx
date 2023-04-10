import React, { useState,createContext, useReducer } from 'react';
import instance from './axios';
import { useDispatch, useSelector } from "react-redux";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  
  const { user, loading } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  var [initalState, setInitalState] = useState(0)
  const item = async () => {
    if (localStorage.getItem("permissions")) {
      if(loading == false && user.message !== "No Token Found"){
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