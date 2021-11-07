
import { TRANSACTION } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";


export default function TransactionsReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  

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
      
      state.transactions.transactions.pop();

      return {
        ...state,
        transactions: {
          transactionsFetchStatus: status,
          transactionsPage: state.transactions.transactionsPage+1,
          transactionsNumberOfPages: action.payload.transactionsNumberOfPages,
          transactions: [...state.transactions.transactions, ...action.payload.transactions, null],
        }
      };
    
    
    default:
      return state;
  }
}

