
import { FETCH_STATUSES, USER, USER_ADDRESS } from "../AppActions";
import { initialUserState } from "../AppInitialStates";

export default function UserReducer (state, action) {
  
  switch (action.type) { 

    case USER.AUTHED:
    case USER.UPDATED:
      return {
        ...state,
        user: action.payload,
        userResponse: { success: 'Success' || action.payload.msg },
        userFetchStatus: FETCH_STATUSES.DONE
      };
    
    case USER.AUTH_FAILED:
    case USER.UPDATE_FAILED:
    case USER.RESET_PASSWORD_FAILED: 
      return {
        ...state,
        userResponse: { errors: action.payload },
        userFetchStatus: FETCH_STATUSES.ERROR
      };

    case USER.RESET_PASSWORD: 
      return {
        ...state,
        userResponse: { success: action.payload.message },
        userFetchStatus: FETCH_STATUSES.DONE
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
          ...state.address,
          address: state.address.address,
          addressFetchStatus: action.payload
        }
      };

    case USER_ADDRESS.FETCHED:
      return {
        ...state,
        address: {
          ...state.address,
          address: action.payload, 
          addressFetchStatus: FETCH_STATUSES.DONE,
        }
      };
    
    default: 
      return state;
  }
}


