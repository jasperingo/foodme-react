
import { 
  //NAVIGATED, 
  RESTAURANT_CATEGORIES_FETCHED
} from "./AppActions";

export default function AppReducer (state, action) {
  
  switch (action.type) {  
    
      case RESTAURANT_CATEGORIES_FETCHED :
        return {
          ...state,
          restaurantCategories: action.payload
        };

    default:
      return state;
  }
}

