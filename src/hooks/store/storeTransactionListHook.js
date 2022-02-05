
import { useCallback, useEffect } from "react";
import { getTransactionsListFetchStatusAction, TRANSACTION } from "../../context/actions/transactionActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useStoreTransactionList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        transactions,
        transactionsPage,
        transactionsLoading,
        transactionsNumberOfPages,
        transactionsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
        storeDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [storeDispatch, transactionsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (transactionsLoading && transactionsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (transactionsLoading && transactionsFetchStatus === FETCH_STATUSES.LOADING) {
        
        storeDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new StoreRepository(userToken);
        api.getTransactionList(store.id, transactionsPage)
        .then(res=> {
          
          if (res.status === 200) {
            
            storeDispatch({
              type: TRANSACTION.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  transactionsPage, 
                  res.body.pagination.number_of_pages, 
                  transactions.length, 
                  res.body.data.length
                ),
              }
            });

          } else if (res.status === 404) {

            storeDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            storeDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      store.id, 
      transactions, 
      transactionsPage, 
      transactionsLoading, 
      transactionsFetchStatus, 
      userToken, 
      storeDispatch, 
      listStatusUpdater
    ]
  );

  return [transactions, transactionsFetchStatus, transactionsPage, transactionsNumberOfPages, refetch];
}

