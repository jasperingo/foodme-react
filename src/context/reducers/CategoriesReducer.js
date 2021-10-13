
import { CATEGORIES, FETCH_STATUSES } from "../AppActions";

export default function CategoriesReducer (state, action) {
  
  switch (action.type) {  
    
    case CATEGORIES.STORES_FETCH_STATUS_CHANGED :
      return {
        ...state,
        stores: {
          stores: state.stores.stores,
          storesFetchStatus: action.payload
        }
      };
    
    case CATEGORIES.STORES_FETCHED :
      return {
        ...state,
        stores: {
          stores: action.payload, 
          storesFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    case CATEGORIES.PRODUCTS_FETCH_STATUS_CHANGED :
      return {
        ...state,
        products: {
          products: state.products.products,
          productsFetchStatus: action.payload
        }
      };
    
    case CATEGORIES.PRODUCTS_FETCHED :
      return {
        ...state,
        products: {
          products: action.payload, 
          productsFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    default:
      return state;
  }
}

