
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
      
      state.savedCarts.savedCarts.pop();

      return {
        ...state,
        savedCarts: {
          savedCartsFetchStatus: status,
          savedCartsPage: state.savedCarts.savedCartsPage+1,
          savedCartsNumberOfPages: action.payload.savedCartsNumberOfPages,
          savedCarts: [...state.savedCarts.savedCarts, ...action.payload.savedCarts, null],
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
    

    default:
      return state;
  }
}

