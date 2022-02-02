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
        savedCartLoading: true,
        savedCart: savedCartState.savedCart,
        savedCartID: savedCartState.savedCartID,
        savedCartFetchStatus: savedCartState.savedCartFetchStatus
      };

    case SAVED_CART.FETCH_STATUS_CHANGED:
      return {
        ...state,
        savedCartID: action.payload.id,
        savedCartLoading: action.payload.loading,
        savedCartFetchStatus: action.payload.fetchStatus
      };
    
    case SAVED_CART.FETCHED:
      return {
        ...state,
        savedCartLoading: false,
        savedCart: action.payload.savedCart, 
        savedCartID: action.payload.savedCart.id, 
        savedCartFetchStatus: action.payload.fetchStatus,
      };


    case SAVED_CART.CREATED:
      console.log('Saved cart created');
      return state;
      
    
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

