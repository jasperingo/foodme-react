
import { FETCH_STATUSES, SAVED_CART } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialSavedCartsState } from "../AppInitialStates";

export default function SavedCartsReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {
    
    case SAVED_CART.UNFETCH:
      return initialSavedCartsState;
    
    case SAVED_CART.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        savedCarts: {
          ...state.savedCarts,
          savedCartsFetchStatus: action.payload,
        }
      };
    
    case SAVED_CART.LIST_FETCHED:
      let status = fetchUpdater(
        state.savedCarts.savedCartsPage, 
        action.payload.savedCartsNumberOfPages, 
        state.savedCarts.savedCarts.length, 
        action.payload.savedCarts.length
      );
      
      const carts = state.savedCarts.savedCarts.filter(i=> i !== null);

      return {
        ...state,
        savedCarts: {
          savedCartsFetchStatus: status,
          savedCartsPage: state.savedCarts.savedCartsPage+1,
          savedCartsNumberOfPages: action.payload.savedCartsNumberOfPages,
          savedCarts: [...carts, ...action.payload.savedCarts, null],
        }
      };

    case SAVED_CART.FETCH_STATUS_CHANGED :
      return {
        ...state,
        order: {
          order: state.order.order,
          orderFetchStatus: action.payload
        }
      };
    
    case SAVED_CART.FETCHED :
      return {
        ...state,
        order: {
          order: action.payload, 
          orderFetchStatus: FETCH_STATUSES.DONE,
        }
      };
    
    case SAVED_CART.DELETED:
     
      const carts1 = state.savedCarts.savedCarts.filter(i=>  i !== null && i.code !== action.payload);

      return {
        ...state,
        savedCarts: {
          ...state.savedCarts,
          savedCarts: [...carts1, null],
          savedCartsFetchStatus: carts1.length === 0 ? FETCH_STATUSES.LOADING : state.savedCarts.savedCartsFetchStatus
        }
      };
    
    default:
      return state;
  }
}

