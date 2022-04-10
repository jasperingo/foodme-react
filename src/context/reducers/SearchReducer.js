import { PRODUCT } from "../actions/productActions";
import { STORE } from "../actions/storeActions";
import searchState from "../states/searchState";

export default function SearchReducer (state, action) {
  
  switch (action.type) {  
    
    case STORE.LIST_UNFETCHED:
      return {
        ...state,
        stores: searchState.stores,
        storesPage: searchState.storesPage,
        storesError: searchState.storesError,
        storesLoaded: searchState.storesLoaded,
        storesLoading: searchState.storesLoading,
        storesNumberOfPages: searchState.storesNumberOfPages,
      };

    case STORE.LIST_FETCHING:
      return {
        ...state,
        storesError: null,
        storesLoading: true
      };

    case STORE.LIST_ERROR_CHANGED:
      return {
        ...state,
        storesLoading: false,
        storesError: action.payload.error
      };
    
    case STORE.LIST_FETCHED:
      return {
        ...state,
        storesLoaded: true,
        storesLoading: false,
        storesPage: state.storesPage + 1,
        storesNumberOfPages: action.payload.numberOfPages,
        stores: [...state.stores, ...action.payload.list],
      };


    case PRODUCT.LIST_UNFETCHED:
      return {
        ...state,
        products: searchState.products,
        productsPage: searchState.productsPage,
        productsError: searchState.productsError,
        productsLoaded: searchState.productsLoaded,
        productsLoading: searchState.productsLoading,
        productsNumberOfPages: searchState.productsNumberOfPages
      };

    case PRODUCT.LIST_FETCHING:
      return {
        ...state,
        productsError: null,
        productsLoading: true
      };

    case PRODUCT.LIST_ERROR_CHANGED:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload.error
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsLoaded: true,
        productsLoading: false,
        productsPage: state.productsPage + 1,
        productsNumberOfPages: action.payload.numberOfPages,
        products: [...state.products, ...action.payload.list],
      };

    default: 
      return state;
  }
}
