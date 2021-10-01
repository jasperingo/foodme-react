
import { NAVIGATED } from "./AppActions";

export default function AppReducer (state, action) {
  
  switch (action.type) {  

    case NAVIGATED :
      return {
        ...state,
        showHeader: action.payload
      };

    default:
      return state;
  }
}

