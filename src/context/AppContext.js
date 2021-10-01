
import React, { useReducer, useContext, createContext } from "react";
import AppReducer from './AppReducer';

const initialState = {
  restaurants: [],
  foods: [],
  cartItems: [],
  restaurantCategories: [],
  showHeader : true,
}

export const API_URL = '/faker/';

export const AppContext = createContext(initialState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{...state, dispatch}}>
      { children }
    </AppContext.Provider>
  );
}


