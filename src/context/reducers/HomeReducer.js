
import { CATEGORIES, FETCH_STATUSES, PRODUCT, STORE } from "../AppActions";
import { getListFetchStatus } from "../AppHelpers";


export default function HomeReducer (state, action) {
  
  switch (action.type) {  
    
    case CATEGORIES.FETCH_STATUS_CHANGED :
      return {
        ...state,
        categories: {
          categories: state.categories.categories,
          categoriesFetchStatus: action.payload
        }
      };
    
    case CATEGORIES.FETCHED :
      return {
        ...state,
        categories: {
          categories: action.payload, 
          categoriesFetchStatus: FETCH_STATUSES.DONE,
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
      let status = getListFetchStatus(
        state.stores.storesPage, 
        action.payload.storesNumberOfPages,
        state.stores.stores.length,  
        action.payload.stores.length
      );

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
      let status2 = getListFetchStatus(
        state.products.productsPage, 
        action.payload.productsNumberOfPages,
        state.products.products.length,  
        action.payload.products.length
      );

      state.products.products.pop();

      return {
        ...state,
        products: {
          productsFetchStatus: status2,
          productsPage: state.products.productsPage+1,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...state.products.products, ...action.payload.products, null],
        }
      };

    default:
      return state;
  }
}

