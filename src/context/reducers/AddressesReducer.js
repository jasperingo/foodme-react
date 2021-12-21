import { ADDRESS, FETCH_STATUSES } from "../AppActions";
import { initialAddressesState } from "../AppInitialStates";

export default function AddressesReducer (state, action) {
  
  switch (action.type) { 
    
    case ADDRESS.LIST_FETCH_STATUS_CHANGED: 
      return {
        ...state,
        addresses: {
          addresses: state.addresses.addresses,
          addressesFetchStatus: action.payload
        }
      };

    case ADDRESS.LIST_FETCHED:
      return {
        ...state,
        addresses: {
          addresses: action.payload, 
          addressesFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    case ADDRESS.UNFETCHED:
      return {
        ...state,
        address: initialAddressesState.address
      };

    case ADDRESS.FETCH_STATUS_CHANGED: 
      return {
        ...state,
        address: {
          ...state.address,
          addressFetchStatus: action.payload
        }
      };

    case ADDRESS.FETCHED:
      return {
        ...state,
        address: {
          ...state.address,
          address: action.payload, 
          addressFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    case ADDRESS.DELETED:
      
      const addrs = state.addresses.addresses.filter(i=>  i !== null && i.id !== action.payload);

      return {
        ...state,
        addresses: {
          ...state.addresses,
          addresses: [...addrs, null],
          addressesFetchStatus: addrs.length === 0 ? FETCH_STATUSES.EMPTY : state.addresses.addressesFetchStatus,
        }
      };
    
    default:
      return state;
  }
}

