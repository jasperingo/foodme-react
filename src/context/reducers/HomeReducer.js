
import { HOME, FETCH_STATUSES } from "../AppActions";
//import { useFetchStatusOnSuccess } from '../AppHooks';

export default function HomeReducer (state, action) {
  
  switch (action.type) {  
    
    case HOME.CATEGORIES_FETCH_STATUS_CHANGED :
      return {
        ...state,
        categories: {
          categories: state.categories.categories,
          categoriesFetchStatus: action.payload
        }
      };
    
    case HOME.CATEGORIES_FETCHED :
      return {
        ...state,
        categories: {
          categories: action.payload, 
          categoriesFetchStatus: FETCH_STATUSES.DONE,
        }
      };
    
    case HOME.STORES_FETCH_STATUS_CHANGED :
      return {
        ...state,
        stores: {
          ...state.stores,
          storesFetchStatus: action.payload
        }
      };
    
    case HOME.STORES_FETCHED :
      let status = FETCH_STATUSES.DONE; // useFetchStatusOnSuccess();
      
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

    default:
      return state;
  }
}

