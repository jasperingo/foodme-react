import { CATEGORY } from "../actions/categoryActions";
import categoryState from "../states/categoryState";

export default function CategoryReducer (state, action) {
  
  switch (action.type) {  
    
    case CATEGORY.STORES_LIST_FETCHING:
      return {
        ...state,
        storesLoading: true
      };

    case CATEGORY.STORES_LIST_ERROR_CHANGED:
      return {
        ...state,
        storesLoading: false,
        storesError: action.payload.error
      };
    
    case CATEGORY.STORES_LIST_FETCHED:
      return {
        ...state,
        storesLoaded: true,
        storesLoading: false,
        stores: action.payload.list
      };


    case CATEGORY.PRODUCTS_LIST_FETCHING:
      return {
        ...state,
        productsLoading: true
      };
    
    case CATEGORY.PRODUCTS_LIST_ERROR_CHANGED:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload.error
      };
      
    case CATEGORY.PRODUCTS_LIST_FETCHED:
      return {
        ...state,
        productsLoaded: true,
        productsLoading: false,
        products: action.payload.list
      };
      

    case CATEGORY.UNFETCHED:
      return {
        ...state,
        category: categoryState.category,
        categoryID: categoryState.categoryID,
        categoryError: categoryState.categoryError,
        categoryLoading: categoryState.categoryLoading
      };
      
    case CATEGORY.FETCHING:
      return {
        ...state,
        categoryError: null,
        categoryLoading: true
      };

    case CATEGORY.ERROR_CHANGED:
      return {
        ...state,
        categoryLoading: false,
        categoryID: action.payload.id, 
        categoryError: action.payload.error
      };
    
    case CATEGORY.FETCHED:
      return {
        ...state,
        categoryLoading: false,
        categoryID: action.payload.id,
        category: action.payload.category
      };

    default:
      return state;
  }
}

