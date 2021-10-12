
import { CATEGORIES, FETCH_STATUSES } from "../AppActions";

export default function CategoriesReducer (state, action) {
  
  switch (action.type) {  
    
    case CATEGORIES.STORES_FETCH_STATUS_CHANGED :
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
    
    case CATEGORIES.STORES_FETCHED :
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

    default:
      return state;
  }
}

