import { ADDRESS } from "../actions/addressActions";
import addressState from "../states/addressState";

export default function AddressReducer (state, action) {
  
  switch (action.type) { 

    case ADDRESS.LOCATIONS_LIST_FETCHING: 
      return {
        ...state,
        locationsError: null,
        locationsLoading: true
      };

    case ADDRESS.LOCATIONS_LIST_ERROR_CHANGED: 
      return {
        ...state,
        locationsLoading: false,
        locationsError: action.payload.error,
      };

    case ADDRESS.LOCATIONS_LIST_FETCHED:
      return {
        ...state,
        locationsLoaded: true,
        locationsLoading: false,
        locations: action.payload.list
      };


    case ADDRESS.UNFETCHED:
      return {
        ...state,
        address: addressState.address,
        addressID: addressState.addressID,
        addressError: addressState.addressError,
        addressLoading: addressState.addressLoading
      };

    case ADDRESS.FETCHING: 
      return {
        ...state,
        addressError: null,
        addressLoading: true
      };

    case ADDRESS.ERROR_CHANGED: 
      return {
        ...state,
        addressLoading: false,
        addressID: action.payload.id,
        addressError: action.payload.error,
      };

    case ADDRESS.FETCHED:
      return {
        ...state,
        addressLoading: false,
        addressID: action.payload.id,
        address: action.payload.address
      };
    
    default:
      return state;
  }
}
