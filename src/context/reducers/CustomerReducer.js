
import { FETCH_STATUSES, USER, USER_ADDRESS } from "../AppActions";
import { initialCustomerState } from "../AppInitialStates";

export default function CustomerReducer (state, action) {
  
  switch (action.type) { 

    case USER.FETCHED:
      return {
        first_name: 'Betty',
        last_name: 'Butter',
        email: 'yam@gmail.com',
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
        address: initialCustomerState.address
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


