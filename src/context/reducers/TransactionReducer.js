import { TRANSACTION } from "../actions/transactionActions";
import transactionState from "../states/transactionState";

export default function TransactionReducer (state, action) {
  
  switch (action.type) {  

    case TRANSACTION.LIST_UNFETCHED:
      return {
        ...state,
        transactionsPage: 1,
        transactionsNumberOfPages: 0,
        transactions: transactionState.transactions,
        transactionsFetchStatus: transactionState.transactionsFetchStatus,
      };

    case TRANSACTION.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        transactionsFetchStatus: action.payload
      };
    
    case TRANSACTION.LIST_FETCHED :
      return {
        ...state,
        transactionsPage: state.transactionsPage+1,
        transactionsFetchStatus: action.payload.fetchStatus,
        transactionsNumberOfPages: action.payload.numberOfPages,
        transactions: [...state.transactions, ...action.payload.list],
      };

    case TRANSACTION.UNFETCHED:
      return {
        ...state,
        transaction: transactionState.transaction,
        transactionFetchStatus: transactionState.transactionFetchStatus
      };
    
    case TRANSACTION.FETCH_STATUS_CHANGED :
      return {
        ...state,
        transactionFetchStatus: action.payload
      };
    
    case TRANSACTION.FETCHED :
      return {
        ...state,
        transaction: action.payload.transaction, 
        transactionFetchStatus: action.payload.fetchStatus,
      };

    // case WALLET.FETCH_STATUS_CHANGED:
    //   return {
    //     ...state,
    //     wallet: {
    //       ...state.wallet,
    //       walletFetchStatus: action.payload
    //     }
    //   };
    
    // case WALLET.FETCHED:
    //   return {
    //     ...state,
    //     wallet: {
    //       wallet: action.payload.amount, 
    //       walletFetchStatus: FETCH_STATUSES.DONE,
    //     }
    //   };
    
    default:
      return state;
  }
}

