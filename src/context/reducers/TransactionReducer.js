import { TRANSACTION } from "../actions/transactionActions";
import transactionState from "../states/transactionState";

export default function TransactionReducer (state, action) {
  
  switch (action.type) {  

    case TRANSACTION.LIST_UNFETCHED:
      return {
        ...state,
        transactionsPage: 1,
        transactionsLoading: true,
        transactionsNumberOfPages: 0,
        transactions: transactionState.transactions,
        transactionsFetchStatus: transactionState.transactionsFetchStatus,
      };

    case TRANSACTION.LIST_TYPE_FILTER_CHANGED:
      return {
        ...state,
        transactionsPage: 1,
        transactionsLoading: true,
        transactionsNumberOfPages: 0,
        transactions: transactionState.transactions,
        transactionsFetchStatus: transactionState.transactionsFetchStatus,
        transactionsType: action.payload.status
      };

    case TRANSACTION.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        transactionsLoading: action.payload.loading,
        transactionsFetchStatus: action.payload.fetchStatus
      };
    
    case TRANSACTION.LIST_FETCHED:
      return {
        ...state,
        transactionsLoading: false,
        transactionsPage: state.transactionsPage+1,
        transactionsFetchStatus: action.payload.fetchStatus,
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

