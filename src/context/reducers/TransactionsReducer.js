
import { FETCH_STATUSES, TRANSACTION, WALLET } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialTransactionsState } from "../AppInitialStates";


export default function TransactionsReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  

    case TRANSACTION.UNFETCH: 
      return initialTransactionsState;
    
    case TRANSACTION.FETCH_STATUS_CHANGED :
      return {
        ...state,
        transaction: {
          ...state.transaction,
          transactionFetchStatus: action.payload
        }
      };
    
    case TRANSACTION.FETCHED :
      return {
        ...state,
        transaction: {
          transaction: action.payload, 
          transactionFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    case TRANSACTION.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        transactions: {
          ...state.transactions,
          transactionsFetchStatus: action.payload
        }
      };
    
    case TRANSACTION.LIST_FETCHED :
      let status = fetchUpdater(
        state.transactions.transactionsPage, 
        action.payload.transactionsNumberOfPages, 
        state.transactions.transactions.length, 
        action.payload.transactions.length
      );
      
      const trans = state.transactions.transactions.filter(i=> i !== null);

      return {
        ...state,
        transactions: {
          transactionsFetchStatus: status,
          transactionsPage: state.transactions.transactionsPage+1,
          transactionsNumberOfPages: action.payload.transactionsNumberOfPages,
          transactions: [...trans, ...action.payload.transactions, null],
        }
      };

    case WALLET.FETCH_STATUS_CHANGED:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          walletFetchStatus: action.payload
        }
      };
    
    case WALLET.FETCHED:
      return {
        ...state,
        wallet: {
          wallet: action.payload.amount, 
          walletFetchStatus: FETCH_STATUSES.DONE,
        }
      };
    
    default:
      return state;
  }
}

