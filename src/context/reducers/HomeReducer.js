import { CATEGORY } from "../actions/categoryActions";
import { PRODUCT } from "../actions/productActions";
import { STORE } from "../actions/storeActions";

export default function HomeReducer (state, action) {
  
  switch (action.type) {  
    
    case CATEGORY.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        categoriesFetchStatus: action.payload
      };
    
    case CATEGORY.LIST_FETCHED:
      return {
        ...state,
        categories: action.payload.list, 
        categoriesFetchStatus: action.payload.fetchStatus,
      };

    case STORE.LIST_FETCH_ERROR_CHANGED:
      return {
        ...state,
        storesLoading: false,
        storesError: action.payload.error
      }
    
    case STORE.LIST_FETCHING:
      return {
        ...state,
        storesLoading: true
      };
    
    case STORE.LIST_FETCHED:
      return {
        ...state,
        stores: action.payload.list,
        storesLoading: false,
        storesLoaded: true,
      };

    case PRODUCT.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        productsFetchStatus: action.payload
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        products: action.payload.list,
        productsFetchStatus: action.payload.fetchStatus,
      };

    default:
      return state;
  }
}

