
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

    default:
      return state;
  }
}

