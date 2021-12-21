
import { REVIEW } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";

export default function ReviewsReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  

    case REVIEW.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        reviews: {
          ...state.reviews,
          reviewsFetchStatus: action.payload
        }
      };
    
    case REVIEW.LIST_FETCHED :
      let status = fetchUpdater(
        state.reviews.reviewsPage, 
        action.payload.reviewsNumberOfPages, 
        state.reviews.reviews.length, 
        action.payload.reviews.length
      );
      
      const rev = state.reviews.reviews.filter(i=> i !== null);

      return {
        ...state,
        reviews: {
          reviewsFetchStatus: status,
          reviewsPage: state.reviews.reviewsPage+1,
          reviewsNumberOfPages: action.payload.reviewsNumberOfPages,
          reviews: [...action.payload.reviews, ...rev, null],
        }
      };
    
    default:
      return state;
  }
}

