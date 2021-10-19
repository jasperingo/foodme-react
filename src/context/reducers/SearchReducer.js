
import { STORE, FETCH_STATUSES, PRODUCT, SEARCH } from "../AppActions";
import { initialSearchState } from "../AppInitialStates";

let status;

export default function SearchReducer (state, action) {
  
  switch (action.type) {  

    case SEARCH.QUERY_CHANGED: 
      return {
        query: action.payload,
        stores: {
          ...initialSearchState.stores,
          stores: [null]
        },
        products: {
          ...initialSearchState.products,
          products: [null]
        }
      };

    case STORE.FETCH_STATUS_CHANGED :
      return {
        ...state,
        stores: {
          ...state.stores,
          storesFetchStatus: action.payload
        }
      };
    
    case STORE.FETCHED :
      status = FETCH_STATUSES.DONE; // useFetchStatusOnSuccess();
      
      if ((state.stores.storesPage+1) < action.payload.storesNumberOfPages) {
        status = FETCH_STATUSES.MORE;
      } else if (state.stores.stores.length === 1 && action.payload.stores.length < 1) 
        status = FETCH_STATUSES.EMPTY;

      state.stores.stores.pop();

      return {
        ...state,
        stores: {
          stores: [...state.stores.stores, ...action.payload.stores, null],
          storesFetchStatus: status,
          storesPage: state.stores.storesPage+1,
          storesNumberOfPages: action.payload.storesNumberOfPages
        }
      };

    case PRODUCT.FETCH_STATUS_CHANGED :
      return {
        ...state,
        products: {
          ...state.products,
          productsFetchStatus: action.payload
        }
      };
    
    case PRODUCT.FETCHED :
      status = FETCH_STATUSES.DONE; // useFetchStatusOnSuccess();
      
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
          productsCategory: state.products.productsCategory,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...state.products.products, ...action.payload.products, null],
        }
      };

    default: 
      return state;
  }
}

