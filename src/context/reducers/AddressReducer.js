import { ADDRESS } from "../actions/addressActions";
import addressState from "../states/addressState";

export default function AddressReducer (state, action) {
  
  switch (action.type) { 

    case ADDRESS.LOCATIONS_LIST_FETCH_STATUS_CHANGED: 
      return {
        ...state,
        locationsFetchStatus: action.payload
      };

    case ADDRESS.LOCATIONS_LIST_FETCHED:
      return {
        ...state,
        locations: action.payload.list, 
        locationsFetchStatus: action.payload.fetchStatus,
      };

    case ADDRESS.LIST_UNFETCHED:
      return {
        ...state,
        addresses: addressState.addresses,
        addressesFetchStatus: addressState.addressesFetchStatus,
      };
    
    case ADDRESS.LIST_FETCH_STATUS_CHANGED: 
      return {
        ...state,
        addressesFetchStatus: action.payload
      };

    case ADDRESS.LIST_FETCHED:
      return {
        ...state,
        addresses: action.payload.list, 
        addressesFetchStatus: action.payload.fetchStatus,
      };

    case ADDRESS.UNFETCHED:
      return {
        ...state,
        address: addressState.address,
        addressFetchStatus: addressState.addressFetchStatus,
      };

    case ADDRESS.FETCH_STATUS_CHANGED: 
      return {
        ...state,
        addressFetchStatus: action.payload
      };

    case ADDRESS.FETCHED:
      return {
        ...state,
        address: action.payload.address, 
        addressFetchStatus: action.payload.fetchStatus
      };

    case ADDRESS.DELETED:
      
      const addrs = state.addresses.filter(i=>  i !== null && i.id !== action.payload);

      return {
        ...state,
        addresses: [...addrs],
        addressesFetchStatus: addrs.length === 0 ? action.payload.fetchStatusEmpty : state.addressesFetchStatus,
      };
    
    default:
      return state;
  }
}

