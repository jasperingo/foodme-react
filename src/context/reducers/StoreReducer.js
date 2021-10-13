
import { STORE, FETCH_STATUSES } from "../AppActions";

export default function StoreReducer (state, action) {
  
  switch (action.type) {  
    
    case STORE.STORE_FETCH_STATUS_CHANGED :
      return {
        ...state,
        store: {
          store: state.store.store,
          storeFetchStatus: action.payload
        }
      };
    
    case STORE.STORE_FETCHED :
      return {
        ...state,
        store: {
          store: action.payload, 
          storeFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    case STORE.PRODUCTS_FETCH_STATUS_CHANGED :
      return {
        ...state,
        products: {
          ...state.products,
          productsFetchStatus: action.payload
        }
      };
    
    case STORE.PRODUCTS_FETCHED :
      let status = FETCH_STATUSES.DONE; // useFetchStatusOnSuccess();
      
      if ((state.products.productsPage+1) < action.payload.productsNumberOfPages) {
        status = FETCH_STATUSES.MORE;
      } else if (state.products.products.length === 1 && action.payload.products.length < 1) 
        status = FETCH_STATUSES.EMPTY;
      
      state.products.products.pop();

      return {
        ...state,
        products: {
          productsFetchStatus: status,
          productsPage: state.products.productsPage+1,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...state.products.products, ...action.payload.products, null],
        }
      };
    
    
    default:
      return state;
  }
}

