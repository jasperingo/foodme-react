import { SAVED_CART } from "../actions/savedCartActions";
import savedCartState from "../states/savedCartState";

export default function SavedCartReducer (state, action) {
  
  switch (action.type) {
    
    case SAVED_CART.LIST_UNFETCHED:
      return {
        ...state,
        savedCartsPage: 1,
        savedCartsLoading: true,
        savedCartsNumberOfPages: 0,
        savedCarts: savedCartState.savedCarts,
        savedCartsFetchStatus: savedCartState.savedCartsFetchStatus,
      };
    
    case SAVED_CART.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        savedCartsLoading: action.payload.loading,
        savedCartsFetchStatus: action.payload.fetchStatus
      };
    
    case SAVED_CART.LIST_FETCHED:
      return {
        ...state,
        savedCartsLoading: false,
        savedCartsPage: state.savedCartsPage+1,
        savedCartsFetchStatus: action.payload.fetchStatus,
        savedCartsNumberOfPages: action.payload.numberOfPages,
        savedCarts: [...state.savedCarts, ...action.payload.list],
      };


    case SAVED_CART.UNFETCHED:
      return {
        ...state,
        savedCart: savedCartState.savedCart,
        savedCartID: savedCartState.savedCartID,
        savedCartError: savedCartState.savedCartError,
        savedCartLoading: savedCartState.savedCartLoading
      };

    case SAVED_CART.FETCHING:
      return {
        ...state,
        savedCartError: null,
        savedCartLoading: true
      };

    case SAVED_CART.ERROR_CHANGED:
      return {
        ...state,
        savedCartLoading: false,
        savedCartID: action.payload.id,
        savedCartError: action.payload.error
      };
    
    case SAVED_CART.FETCHED:
      return {
        ...state,
        savedCartLoading: false,
        savedCartID: action.payload.id,
        savedCart: action.payload.savedCart
      };
    
    default:
      return state;
  }
}
