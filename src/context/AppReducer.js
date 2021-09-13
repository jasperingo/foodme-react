
import { NAVIGATED, NAVIGATED_FROM_SEARCH } from "./AppActions";

export default function AppReducer (state, action) {
  
  switch (action.type) {  

    case NAVIGATED :
      return {
        ...state,
        showHeader: action.payload
      };

    case NAVIGATED_FROM_SEARCH :
      return {
        ...state,
        showSearchForm: action.payload
      };

    default:
      return state;
  }
}

