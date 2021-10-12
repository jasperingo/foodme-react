
import { HOME, FETCH_STATUSES } from "../AppActions";
//import { useFetchStatusOnSuccess } from '../AppHooks';

export default function HomeReducer (state, action) {
  
  switch (action.type) {  
    
    case HOME.CATEGORIES_FETCH_STATUS_CHANGED :
      return {
        ...state,
        home: {
          ...state.home,
          categories: {
            categories: state.home.categories.categories,
            categoriesFetchStatus: action.payload
          }
        }
      };
    
    case HOME.CATEGORIES_FETCHED :
      return {
        ...state,
        home: {
          ...state.home,
          categories: {
            categories: action.payload, 
            categoriesFetchStatus: FETCH_STATUSES.DONE,
          }
        }
      };
    
    case HOME.STORES_FETCH_STATUS_CHANGED :
      return {
        ...state,
        home: {
          ...state.home,
          stores: {
            ...state.home.stores,
            storesFetchStatus: action.payload
          }
        }
      };
    
    case HOME.STORES_FETCHED :
      let status = FETCH_STATUSES.DONE; // useFetchStatusOnSuccess();
      
      if ((state.home.stores.storesPage+1) < action.payload.storesNumberOfPages) {
        status = FETCH_STATUSES.MORE;
      } else if (state.home.stores.stores.length === 1 && action.payload.stores.length < 1) 
        status = FETCH_STATUSES.EMPTY;

      state.home.stores.stores.pop();

      return {
        ...state,
        home: {
          ...state.home,
          stores: {
            stores: [...state.home.stores.stores, ...action.payload.stores, null],
            storesFetchStatus: status,
            storesPage: state.home.stores.storesPage+1,
            storesNumberOfPages: action.payload.storesNumberOfPages
          }
        }
      };

    default:
      return state;
  }
}

