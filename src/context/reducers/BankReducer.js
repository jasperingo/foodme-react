import { BANK } from "../actions/bankActions";

export default function BankReducer (state, action) {
  
  switch (action.type) { 
    
    case BANK.LIST_FETCH_STATUS_CHANGED: 
      return {
        ...state,
        banks: {
          banks: state.banks.banks,
          banksFetchStatus: action.payload
        }
      };

    case BANK.LIST_FETCHED:
      return {
        ...state,
        banks: {
          banks: action.payload.list, 
          banksFetchStatus: action.payload.fetchStatus,
        }
      };
    
    default:
      return state;
  }
}

