
import React, { useReducer, useContext, createContext } from "react";
import { 
  initialHomeState, 
  initialCategoriesState, 
  initialProductState, 
  initialStoreState, 
  initialSearchState,
  initialCartState
} from './AppInitialStates';
import HomeReducer from './reducers/HomeReducer';
import CategoriesReducer from './reducers/CategoriesReducer';
import StoreReducer from './reducers/StoreReducer';
import ProductReducer from './reducers/ProductReducer';
import SearchReducer from "./reducers/SearchReducer";
import CartReducer from "./reducers/CartReducer";


export const API_URL = '/faker/';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  
  const [homeState, homeDispatch] = useReducer(HomeReducer, initialHomeState);

  const [categoriesState, categoriesDispatch] = useReducer(CategoriesReducer, initialCategoriesState);

  const [productState, productDispatch] = useReducer(ProductReducer, initialProductState);

  const [storeState, storeDispatch] = useReducer(StoreReducer, initialStoreState);

  const [searchState, searchDispatch] = useReducer(SearchReducer, initialSearchState);

  const [cartState, cartDispatch] = useReducer(CartReducer, initialCartState);

  return (
    <AppContext.Provider value={{
        home: homeState, 
        homeDispatch,
        categories: categoriesState, 
        categoriesDispatch,
        product: productState, 
        productDispatch,
        store: storeState, 
        storeDispatch,
        search: searchState,
        searchDispatch,
        cart: cartState,
        cartDispatch
      }}
    >
      { children }
    </AppContext.Provider>
  );
}


