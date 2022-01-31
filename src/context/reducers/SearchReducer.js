import { PRODUCT } from "../actions/productActions";
import { SEARCH } from "../actions/searchActions";
import { STORE } from "../actions/storeActions";
import searchState from "../states/searchState";


export default function SearchReducer (state, action) {
  
  switch (action.type) {  

    case SEARCH.QUERY_CHANGED: 
      return {
        ...searchState,
        query: action.payload
      };

    case STORE.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        storesFetchStatus: action.payload
      };
    
    case STORE.LIST_FETCHED :
      return {
        ...state,
        storesPage: state.storesPage+1,
        storesFetchStatus: action.payload.fetchStatus,
        storesNumberOfPages: action.payload.numberOfPages,
        stores: [...state.stores, ...action.payload.list],
      };

    case PRODUCT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        productsFetchStatus: action.payload
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsPage: state.productsPage+1,
        productsFetchStatus: action.payload.fetchStatus,
        productsNumberOfPages: action.payload.numberOfPages,
        products: [...state.products, ...action.payload.list],
      };

    default: 
      return state;
  }
}

