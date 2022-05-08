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
        promotionsError: null,
        promotionsLoading: true
      };
    
    case PROMOTION.LIST_FETCHED:
      return {
        ...state,
        promotionsLoaded: true,
        promotionsLoading: false,
        promotions: action.payload.list
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
        storesError: null,
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
          productsError: null,
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

