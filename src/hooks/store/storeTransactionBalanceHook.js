
import { useCallback, useEffect } from "react";
import { getTransactionBalanceFetchStatusAction, TRANSACTION } from "../../context/actions/transactionActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";


export function useStoreTransactionBalance(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        transactionBalance,
        transactionBalanceLoading,
        transactionBalanceFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (transactionBalanceFetchStatus !== FETCH_STATUSES.LOADING) 
        storeDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [storeDispatch, transactionBalanceFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (transactionBalanceLoading && transactionBalanceFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (transactionBalanceLoading && transactionBalanceFetchStatus === FETCH_STATUSES.LOADING) {
        
        storeDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new StoreRepository(userToken);
        api.getTransactionBalance(store.id)
        .then(res=> {
          
          if (res.status === 200) {
            
            storeDispatch({
              type: TRANSACTION.BALANCE_FETCHED, 
              payload: {
                balance: res.body.data.balance, 
                fetchStatus: FETCH_STATUSES.DONE
              }
            });

          } else if (res.status === 404) {

            storeDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            storeDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      store.id,
      transactionBalanceLoading, 
      transactionBalanceFetchStatus, 
      userToken, 
      storeDispatch
    ]
  );

  return [transactionBalance, transactionBalanceFetchStatus, refetch];
}


