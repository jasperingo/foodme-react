import { CATEGORY } from "../actions/categoryActions";
import { PRODUCT } from "../actions/productActions";
import { PROMOTION } from "../actions/promotionActions";
import { STORE } from "../actions/storeActions";

export default function HomeReducer (state, action) {
  
  switch (action.type) {  

    case PROMOTION.LIST_ERROR_CHANGED:
      return {
        ...state,
        promotionsLoading: false,
        promotionsError: action.payload.error
      }
    
    case PROMOTION.LIST_FETCHING:
      return {
        ...state,
        promotionsLoading: true
      };
    
    case PROMOTION.LIST_FETCHED:
      return {
        ...state,
        promotionsLoaded: true,
        promotionsLoading: false,
        promotions: action.payload.list
      };
    
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

    case STORE.LIST_ERROR_CHANGED:
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
        storesLoaded: true,
        storesLoading: false,
        stores: action.payload.list
      };

    case PRODUCT.LIST_ERROR_CHANGED:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload.error
      };

    case PRODUCT.LIST_FETCHING:
        return {
          ...state,
          productsLoading: true
        };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsLoaded: true,
        productsLoading: false,
        products: action.payload.list,
      };

    default:
      return state;
  }
}

