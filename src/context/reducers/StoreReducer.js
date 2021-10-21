
import { STORE, PRODUCT, REVIEW, FETCH_STATUSES } from "../AppActions";
import { initialStoreState } from "../AppInitialStates";


export default function StoreReducer (state, action) {
  
  switch (action.type) {  

    case STORE.UNFETCH: 
      return initialStoreState;
    
    case STORE.FETCH_STATUS_CHANGED :
      return {
        ...state,
        store: {
          store: state.store.store,
          storeFetchStatus: action.payload
        }
      };
    
    case STORE.FETCHED :
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
      
      if ((state.products.productsPage+1) < action.payload.productsNumberOfPages) 
        status = FETCH_STATUSES.MORE;
      else if (state.products.products.length === 1 && action.payload.products.length < 1) 
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
    
    case PRODUCT.FILTER_CHANGED :
      return {
        ...state,
        products: {
          ...initialStoreState.products,
          products: [null],
          productsCategory: action.payload
        }
      };

    case REVIEW.FETCH_STATUS_CHANGED :
      return {
        ...state,
        reviews: {
          ...state.reviews,
          reviewsFetchStatus: action.payload
        }
      };

    case REVIEW.FETCHED:
      let status2 = FETCH_STATUSES.DONE; // useFetchStatusOnSuccess();
      
      if ((state.reviews.reviewsPage+1) < action.payload.reviewsNumberOfPages) 
        status2 = FETCH_STATUSES.MORE;
      else if (state.reviews.reviews.length === 1 && action.payload.reviews.length < 1) 
        status2 = FETCH_STATUSES.EMPTY;
        
      state.reviews.reviews.pop();

      return {
        ...state,
        reviews: {
          reviewsFetchStatus: status2,
          reviewsPage: state.reviews.reviewsPage+1,
          reviewsNumberOfPages: action.payload.reviewsNumberOfPages,
          reviews: [...state.reviews.reviews, ...action.payload.reviews, null],
        }
      }; 
    
    default:
      return state;
  }
}

