
import { STORE, PRODUCT, SEARCH } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialSearchState } from "../AppInitialStates";

let status;

export default function SearchReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
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

    case STORE.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        stores: {
          ...state.stores,
          storesFetchStatus: action.payload
        }
      };
    
    case STORE.LIST_FETCHED :
      status = fetchUpdater(
        state.stores.storesPage, 
        action.payload.storesNumberOfPages, 
        state.stores.stores.length, 
        action.payload.stores.length
      );
      
      const st = state.stores.stores.filter(i=> i !== null);
      
      return {
        ...state,
        stores: {
          storesFetchStatus: status,
          storesPage: state.stores.storesPage+1,
          storesNumberOfPages: action.payload.storesNumberOfPages,
          stores: [...st, ...action.payload.stores, null],
        }
      };

    case PRODUCT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        products: {
          ...state.products,
          productsFetchStatus: action.payload
        }
      };
    
    case PRODUCT.LIST_FETCHED :
      status = fetchUpdater(
        state.products.productsPage, 
        action.payload.productsNumberOfPages, 
        state.products.products.length, 
        action.payload.products.length
      );

      const prods = state.products.products.filter(i=> i !== null);

      return {
        ...state,
        products: {
          productsFetchStatus: status,
          productsPage: state.products.productsPage+1,
          productsCategory: state.products.productsCategory,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...prods, ...action.payload.products, null],
        }
      };

    default: 
      return state;
  }
}

