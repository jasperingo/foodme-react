
import { useCallback, useMemo } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreTransactionList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        transactions,
        transactionsPage,
        transactionsLoading,
        transactionsLoaded,
        transactionsError,
        transactionsNumberOfPages,
      } 
    }
  } = useAppContext();
  
  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);

  function refreshStoreTransactions() {
    storeDispatch({ type: TRANSACTION.LIST_UNFETCHED });
  }

  const fetchStoreTransactions = useCallback(
    async function(ID) {

      if (transactionsLoading) return;

      if (!window.navigator.onLine) {
        storeDispatch({
          type: TRANSACTION.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      storeDispatch({ type: TRANSACTION.LIST_FETCHING });

      try {
        
        const res = await api.getTransactionList(ID, transactionsPage);
          
        if (res.status === 200) {
          storeDispatch({
            type: TRANSACTION.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }

      } catch(error) {
        storeDispatch({
          type: TRANSACTION.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      transactionsPage, 
      transactionsLoading, 
      storeDispatch, 
    ]
  );

  return [
    fetchStoreTransactions,
    transactions, 
    transactionsLoading,
    transactionsLoaded,
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages,
    refreshStoreTransactions
  ];
}
