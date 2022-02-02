import { PRODUCT } from "../actions/productActions";
import { SEARCH } from "../actions/searchActions";
import { STORE } from "../actions/storeActions";
import searchState from "../states/searchState";


export default function SearchReducer (state, action) {
  
  switch (action.type) {  

    case SEARCH.QUERY_CHANGED: 
      return {
        ...searchState,
        query: action.payload,
        storesSubCategory: state.storesSubCategory,
        productsSubCategory: state.productsSubCategory
      };

    case SEARCH.STORES_FILTER_CHANGED: 
      return {
        ...searchState,
        query: state.query,
        storesSubCategory: action.payload
      };

    case SEARCH.PRODUCTS_FILTER_CHANGED: 
      return {
        ...searchState,
        query: state.query,
        productsSubCategory: action.payload
      };
    
    case STORE.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        storesLoading: action.payload.loading,
        storesFetchStatus: action.payload.fetchStatus
      };
    
    case STORE.LIST_FETCHED:
      return {
        ...state,
        storesLoading: false,
        storesPage: state.storesPage+1,
        storesFetchStatus: action.payload.fetchStatus,
        storesNumberOfPages: action.payload.numberOfPages,
        stores: [...state.stores, ...action.payload.list],
      };

    case PRODUCT.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        productsLoading: action.payload.loading,
        productsFetchStatus: action.payload.fetchStatus
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsLoading: false,
        productsPage: state.productsPage+1,
        productsFetchStatus: action.payload.fetchStatus,
        productsNumberOfPages: action.payload.numberOfPages,
        products: [...state.products, ...action.payload.list],
      };

    default: 
      return state;
  }
}

