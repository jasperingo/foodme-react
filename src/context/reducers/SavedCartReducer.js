import { SAVED_CART } from "../actions/savedCartActions";
import savedCartState from "../states/savedCartState";


export default function SavedCartReducer (state, action) {
  
  switch (action.type) {
    
    case SAVED_CART.LIST_UNFETCHED:
      return {
        ...state,
        savedCartsPage: 1,
        savedCartsNumberOfPages: 0,
        savedCarts: savedCartState.savedCarts,
        savedCartsFetchStatus: savedCartState.savedCartsFetchStatus,
      };
    
    case SAVED_CART.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        savedCartsFetchStatus: action.payload
      };
    
    case SAVED_CART.LIST_FETCHED:
      return {
        ...state,
        savedCartsPage: state.savedCartsPage+1,
        savedCartsFetchStatus: action.payload.fetchStatus,
        savedCartsNumberOfPages: action.payload.numberOfPages,
        savedCarts: [...state.savedCarts, ...action.payload.list],
      };

    // case SAVED_CART.FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     order: {
    //       order: state.order.order,
    //       orderFetchStatus: action.payload
    //     }
    //   };
    
    // case SAVED_CART.FETCHED :
    //   return {
    //     ...state,
    //     order: {
    //       order: action.payload, 
    //       orderFetchStatus: FETCH_STATUSES.DONE,
    //     }
    //   };
    
    // case SAVED_CART.DELETED:
     
    //   const carts1 = state.savedCarts.savedCarts.filter(i=>  i !== null && i.code !== action.payload);

    //   return {
    //     ...state,
    //     savedCarts: {
    //       ...state.savedCarts,
    //       savedCarts: [...carts1, null],
    //       savedCartsFetchStatus: carts1.length === 0 ? FETCH_STATUSES.LOADING : state.savedCarts.savedCartsFetchStatus
    //     }
    //   };
    
    default:
      return state;
  }
}

