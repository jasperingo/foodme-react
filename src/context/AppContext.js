
import React, { useReducer, useContext, createContext } from "react";
import { FETCH_STATUSES } from './AppActions';
import HomeReducer from './reducers/HomeReducer';
import CategoriesReducer from './reducers/CategoriesReducer';

const initialState = {
  customer: null,
  store: {
    profile: null,
    products: [],
    reviews: [],
    promotions: []
  },
  product: {
    profile: null,
    store: null,
    reviews: [],
    related: []
  },
  cart: {
    items: [],
    data: null
  }
};

const initialHomeState = {
  categories: {
    categories: [null],
    categoriesFetchStatus: FETCH_STATUSES.LOADING
  },
  stores: {
    stores: [null],
    storesFetchStatus: FETCH_STATUSES.LOADING,
    storesPage: 0,
    storesNumberOfPages: 0
  }
};

const initialCategoriesState = {
  stores: [],
  products: []
};

export const API_URL = '/faker/';

export const AppContext = createContext(initialState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  
  const [homeState, homeDispatch] = useReducer(HomeReducer, initialHomeState);

  const [categoriesState, categoriesDispatch] = useReducer(CategoriesReducer, initialCategoriesState);

  return (
    <AppContext.Provider value={{
      home: homeState, 
      homeDispatch,
      categories: categoriesState, 
      categoriesDispatch
      }}
    >
      { children }
    </AppContext.Provider>
  );
}


