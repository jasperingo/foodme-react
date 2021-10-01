
import { 
  NAVIGATED, 
  RESTAURANT_CATEGORIES_FETCHED
} from "./AppActions";

export default function AppReducer (state, action) {
  
  switch (action.type) {  

    case NAVIGATED :
      return {
        ...state,
        showHeader: action.payload
      };
    
      case RESTAURANT_CATEGORIES_FETCHED :
        return {
          ...state,
          restaurantCategories: action.payload
        };

    default:
      return state;
  }
}

