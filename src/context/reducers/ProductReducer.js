
import { PRODUCT, REVIEW, FETCH_STATUSES } from "../AppActions";
import { initialProductState } from "../AppInitialStates";

export default function ProductReducer (state, action) {
  
  switch (action.type) {  

    case PRODUCT.UNFETCH:
      return initialProductState;
    
    case PRODUCT.FETCH_STATUS_CHANGED :
      return {
        ...state,
        product: {
          product: state.product.product,
          productFetchStatus: action.payload
        }
      };
    
    case PRODUCT.FETCHED :
      return {
        ...state,
        product: {
          product: action.payload, 
          productFetchStatus: FETCH_STATUSES.DONE,
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

    case PRODUCT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        related: {
          ...state.related,
          relatedFetchStatus: action.payload
        }
      };
    
    case PRODUCT.LIST_FETCHED: 
      let status3 = FETCH_STATUSES.DONE; // useFetchStatusOnSuccess();
        
      if ((state.related.relatedPage+1) < action.payload.relatedNumberOfPages) 
        status3 = FETCH_STATUSES.MORE;
      else if (state.related.related.length === 1 && action.payload.related.length < 1) 
        status3 = FETCH_STATUSES.EMPTY;
        
      state.related.related.pop();

      return {
        ...state,
        related: {
          relatedFetchStatus: status3,
          relatedPage: state.related.relatedPage+1,
          relatedNumberOfPages: action.payload.relatedNumberOfPages,
          related: [...state.related.related, ...action.payload.related, null],
        }
      };

    default:
      return state;
  }
}

