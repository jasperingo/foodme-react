
import React, { useReducer, useContext, createContext } from "react";
import {
  initialHomeState, 
  initialCategoriesState, 
  initialProductsState, 
  initialStoreState, 
  initialSearchState,
  initialCartState,
  initialOrdersState,
  initialSavedCartsState,
  initialTransactionsState,
  initialPromotionsState,
  initialUserState,
  initialReviewsState,
  initialCustomerState,
  initialDeliveryFirmState
} from './AppInitialStates';
import UserReducer from './reducers/UserReducer';
import HomeReducer from './reducers/HomeReducer';
import CategoriesReducer from './reducers/CategoriesReducer';
import StoreReducer from './reducers/StoreReducer';
import ProductReducer from './reducers/ProductReducer';
import SearchReducer from "./reducers/SearchReducer";
import CartReducer from "./reducers/CartReducer";
import OrdersReducer from "./reducers/OrdersReducer";
import PromotionsReducer from "./reducers/PromotionsReducer";
import SavedCartsReducer from "./reducers/SavedCartsReducer";
import TransactionsReducer from "./reducers/TransactionsReducer";
import ReviewsReducer from "./reducers/ReviewsReducer";
import CustomersReducer from "./reducers/CustomersReducer";
import DeliveryFirmsReducer from "./reducers/DeliveryFirmsReducer";

export const API_URL = '/faker/';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);

  const [customerState, customersDispatch] = useReducer(CustomersReducer, initialCustomerState);
  
  const [homeState, homeDispatch] = useReducer(HomeReducer, initialHomeState);

  const [categoriesState, categoriesDispatch] = useReducer(CategoriesReducer, initialCategoriesState);

  const [productsState, productsDispatch] = useReducer(ProductReducer, initialProductsState);

  const [storesState, storesDispatch] = useReducer(StoreReducer, initialStoreState);

  const [searchState, searchDispatch] = useReducer(SearchReducer, initialSearchState);

  const [cartState, cartDispatch] = useReducer(CartReducer, initialCartState);

  const [ordersState, ordersDispatch] = useReducer(OrdersReducer, initialOrdersState);

  const [promotionsState, promotionsDispatch] = useReducer(PromotionsReducer, initialPromotionsState);

  const [savedCartsState, savedCartsDispatch] = useReducer(SavedCartsReducer, initialSavedCartsState);

  const [transactionsState, transactionsDispatch] = useReducer(TransactionsReducer, initialTransactionsState);

  const [reviewsState, reviewsDispatch] = useReducer(ReviewsReducer, initialReviewsState);

  const [deliveryFirmsState, deliveryFirmsDispatch] = useReducer(DeliveryFirmsReducer, initialDeliveryFirmState);


  return (
    <AppContext.Provider value={{
        user: userState,
        userDispatch,
        home: homeState, 
        homeDispatch,
        customers: customerState, 
        customersDispatch,
        categories: categoriesState, 
        categoriesDispatch,
        products: productsState, 
        productsDispatch,
        stores: storesState, 
        storesDispatch,
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
        promotions: promotionsState,
        promotionsDispatch,
        reviews: reviewsState,
        reviewsDispatch,
        deliveryFirms: deliveryFirmsState, 
        deliveryFirmsDispatch
      }}
    >
      { children }
    </AppContext.Provider>
  );
}


