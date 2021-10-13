
import { PRODUCT, FETCH_STATUSES } from "../AppActions";

export default function ProductReducer (state, action) {
  //console.log(state)
  switch (action.type) {  
    
    case PRODUCT.PRODUCT_FETCH_STATUS_CHANGED :
      return {
        ...state,
        product: {
          product: state.product.product,
          productFetchStatus: action.payload
        }
      };
    
    case PRODUCT.PRODUCT_FETCHED :
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

