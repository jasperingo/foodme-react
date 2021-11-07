
import React, { useReducer, useContext, createContext } from "react";
import { 
  initialCustomerState,
  initialHomeState, 
  initialCategoriesState, 
  initialProductState, 
  initialStoreState, 
  initialSearchState,
  initialCartState,
  initialOrdersState,
  initialSavedCartsState,
  initialTransactionsState,
  initialProductsState
} from './AppInitialStates';
import CustomerReducer from './reducers/CustomerReducer';
import HomeReducer from './reducers/HomeReducer';
import CategoriesReducer from './reducers/CategoriesReducer';
import StoreReducer from './reducers/StoreReducer';
import ProductReducer from './reducers/ProductReducer';
import SearchReducer from "./reducers/SearchReducer";
import CartReducer from "./reducers/CartReducer";
import OrdersReducer from "./reducers/OrdersReducer";
import ProductsReducer from "./reducers/ProductsReducer";
import SavedCartsReducer from "./reducers/SavedCartsReducer";
import TransactionsReducer from "./reducers/TransactionsReducer";

export const API_URL = '/faker/';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

  const [customerState, customerDispatch] = useReducer(CustomerReducer, initialCustomerState);
  
  const [homeState, homeDispatch] = useReducer(HomeReducer, initialHomeState);

  const [categoriesState, categoriesDispatch] = useReducer(CategoriesReducer, initialCategoriesState);

  const [productState, productDispatch] = useReducer(ProductReducer, initialProductState);

  const [storeState, storeDispatch] = useReducer(StoreReducer, initialStoreState);

  const [searchState, searchDispatch] = useReducer(SearchReducer, initialSearchState);

  const [cartState, cartDispatch] = useReducer(CartReducer, initialCartState);

  const [ordersState, ordersDispatch] = useReducer(OrdersReducer, initialOrdersState);

  const [savedCartsState, savedCartsDispatch] = useReducer(SavedCartsReducer, initialSavedCartsState);

  const [transactionsState, transactionsDispatch] = useReducer(TransactionsReducer, initialTransactionsState);


  const [productsState, productsDispatch] = useReducer(ProductsReducer, initialProductsState);


  return (
    <AppContext.Provider value={{
        customer: customerState,
        customerDispatch,
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
        cartDispatch,
        orders: ordersState, 
        ordersDispatch,
        savedCarts: savedCartsState, 
        savedCartsDispatch,
        transactions: transactionsState, 
        transactionsDispatch,

        products: productsState, 
        productsDispatch
      }}
    >
      { children }
    </AppContext.Provider>
  );
}


