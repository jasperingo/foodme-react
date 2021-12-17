
import { CATEGORIES, FETCH_STATUSES, PRODUCT, STORE } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";


export default function HomeReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  
    
    case CATEGORIES.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        categories: {
          ...state.categories,
          categoriesFetchStatus: action.payload
        }
      };
    
    case CATEGORIES.LIST_FETCHED :
      return {
        ...state,
        categories: {
          categories: action.payload, 
          categoriesFetchStatus: FETCH_STATUSES.DONE,
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
      let status = fetchUpdater(
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
      let status2 = fetchUpdater(
        state.products.productsPage, 
        action.payload.productsNumberOfPages,
        state.products.products.length,  
        action.payload.products.length
      );

      const prod = state.products.products.filter(i=> i !== null);

      return {
        ...state,
        products: {
          productsFetchStatus: status2,
          productsPage: state.products.productsPage+1,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...prod, ...action.payload.products, null],
        }
      };

    default:
      return state;
  }
}

