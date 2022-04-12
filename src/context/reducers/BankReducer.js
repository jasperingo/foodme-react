import { BANK } from "../actions/bankActions";

export default function BankReducer (state, action) {
  
  switch (action.type) { 
    
    case BANK.LIST_FETCHING:
      return {
        ...state,
        banksError: null,
        banksLoading: true
      };

    case BANK.LIST_ERROR_CHANGED:
      return {
        ...state,
        banksLoading: false,
        banksError: action.payload.error
      };

    case BANK.LIST_FETCHED:
      return {
        ...state,
        banksLoaded: true, 
        banksLoading: false, 
        banks: action.payload.list
      };
    
    default:
      return state;
  }
}

