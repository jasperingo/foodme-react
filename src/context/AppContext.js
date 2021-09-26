
import React, { useReducer, useContext, createContext } from "react";
import AppReducer from './AppReducer';

const initialState = {
  resturants : [],
  foods : [],
  cartItems : [],
  showHeader : true,
  showSearchForm: false,
}

export const AppContext = createContext(initialState);

export const useAppContext = () => useContext(AppContext);

export const useAppLocation = (url, loct) => {
  return { 
    pathname : url, 
    state : { previousPath : loct.pathname } 
  };
}

export const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{...state, dispatch}}>
      { children }
    </AppContext.Provider>
  );
}


