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
        transactionLoading: true,
        transaction: transactionState.transaction,
        transactionID: transactionState.transactionID,
        transactionFetchStatus: transactionState.transactionFetchStatus
      };
    
    case TRANSACTION.FETCH_STATUS_CHANGED:
      return {
        ...state,
        transactionID: action.payload.id,
        transactionLoading: action.payload.loading,
        transactionFetchStatus: action.payload.fetchStatus
      };
    
    case TRANSACTION.FETCHED:
      return {
        ...state,
        transactionLoading: false,
        transaction: action.payload.transaction, 
        transactionID: action.payload.transaction.id, 
        transactionFetchStatus: action.payload.fetchStatus,
      };
    
    default:
      return state;
  }
}

