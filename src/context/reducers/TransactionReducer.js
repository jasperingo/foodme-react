import { TRANSACTION } from "../actions/transactionActions";
import transactionState from "../states/transactionState";

export default function TransactionReducer (state, action) {
  
  switch (action.type) {  

    case TRANSACTION.LIST_UNFETCHED:
      return {
        ...state,
        transactions: transactionState.transactions,
        transactionsPage: transactionState.transactionsPage,
        transactionsError: transactionState.transactionsError,
        transactionsLoaded: transactionState.transactionsLoaded,
        transactionsLoading: transactionState.transactionsLoading,
        transactionsNumberOfPages: transactionState.transactionsNumberOfPages
      };

    case TRANSACTION.LIST_FETCHING:
      return {
        ...state,
        transactionsError: null,
        transactionsLoading: true
      };

    case TRANSACTION.LIST_ERROR_CHANGED:
      return {
        ...state,
        transactionsLoading: false,
        transactionsError: action.payload.error
      };
    
    case TRANSACTION.LIST_FETCHED:
      return {
        ...state,
        transactionsLoaded: true,
        transactionsLoading: false,
        transactionsPage: state.transactionsPage + 1,
        transactionsNumberOfPages: action.payload.numberOfPages,
        transactions: [...state.transactions, ...action.payload.list],
      };


    case TRANSACTION.UNFETCHED:
      return {
        ...state,
        transaction: transactionState.transaction,
        transactionID: transactionState.transactionID,
        transactionError: transactionState.transactionError,
        transactionLoading: transactionState.transactionLoading
      };
    
    case TRANSACTION.FETCHING:
      return {
        ...state,
        transactionError: null,
        transactionLoading: true
      };

    case TRANSACTION.ERROR_CHANGED:
      return {
        ...state,
        transactionLoading: false,
        transactionID: action.payload.id,
        transactionError: action.payload.error
      };
    
    case TRANSACTION.FETCHED:
      return {
        ...state,
        transactionLoading: false,
        transactionID: action.payload.id, 
        transaction: action.payload.transaction
      };
    
    default:
      return state;
  }
}

