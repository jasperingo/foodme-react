
import { useCallback, useMemo } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreTransactionBalance(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        transactionBalance,
        transactionBalanceLoading,
        transactionBalanceError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);

  function refreshStoreTransactions() {
    storeDispatch({ type: TRANSACTION.BALANCE_UNFETCHED });
  }
  
  const fetchStoreTransactionBalance = useCallback(
    async function(ID) {

      if (transactionBalanceLoading) return;
      
      if (!window.navigator.onLine) {
        storeDispatch({

        });
        return;
      }

      storeDispatch({ type: TRANSACTION.BALANCE_FETCHING });
      
      try {

        const res = await api.getTransactionBalance(ID);
          
          if (res.status === 200) {
            
            storeDispatch({
              type: TRANSACTION.BALANCE_FETCHED, 
              payload: {
                balance: res.body.data.balance, 
                fetchStatus: FETCH_STATUSES.DONE
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
            type: TRANSACTION.BALANCE_ERROR_CHANGED,
            payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
          });
      }
    },
    [
      api,
      transactionBalanceLoading,
      storeDispatch
    ]
  );

  return [
    fetchStoreTransactionBalance,
    transactionBalance, 
    transactionBalanceLoading,
    transactionBalanceError,
    refreshStoreTransactions
  ];
}
