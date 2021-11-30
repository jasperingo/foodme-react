
import { FETCH_STATUSES, USER, USER_ADDRESS } from "../AppActions";
import { initialUserState } from "../AppInitialStates";

export default function UserReducer (state, action) {
  
  switch (action.type) { 

    case USER.AUTHED:
    case USER.UPDATED:
      return {
        ...state,
        user: action.payload,
        userFetchStatus: FETCH_STATUSES.DONE
      };
    
    case USER.AUTH_FAILED:
    case USER.UPDATE_FAILED:
      return {
        ...state,
        userErrors: action.payload,
        userFetchStatus: FETCH_STATUSES.ERROR
      };
    
    case USER.FETCH_STATUS_CHANGED: 
      return {
        ...state,
        userFetchStatus: action.payload
      };

    case USER_ADDRESS.LIST_FETCH_STATUS_CHANGED: 
      return {
        ...state,
        addresses: {
          addresses: state.addresses.addresses,
          addressesFetchStatus: action.payload
        }
      };

    case USER_ADDRESS.LIST_FETCHED:
      return {
        ...state,
        addresses: {
          addresses: action.payload, 
          addressesFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    case USER_ADDRESS.UNFETCHED:
      return {
        ...state,
        address: initialUserState.address
      };

    case USER_ADDRESS.FETCH_STATUS_CHANGED: 
      return {
        ...state,
        address: {
          address: state.address.address,
          addressFetchStatus: action.payload
        }
      };

    case USER_ADDRESS.FETCHED:
      return {
        ...state,
        address: {
          address: action.payload, 
          addressFetchStatus: FETCH_STATUSES.DONE,
        }
      };
    
    default: 
      return state;
  }
}


