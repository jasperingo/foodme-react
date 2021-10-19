
import { PRODUCT, FETCH_STATUSES } from "../AppActions";
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

    default:
      return state;
  }
}

