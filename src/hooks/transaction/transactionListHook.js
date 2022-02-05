import { useCallback, useEffect } from "react";
import { getTransactionsListFetchStatusAction, TRANSACTION } from "../../context/actions/transactionActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useTransactionList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    transaction: { 
      transactionDispatch,
      transaction: {
        transactions,
        transactionsPage,
        transactionsLoading,
        transactionsNumberOfPages,
        transactionsFetchStatus
      } 
    }, 
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();


  const refetch = useCallback(
    ()=> {
      if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
        transactionDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [transactionDispatch, transactionsFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      transactionDispatch({ type: TRANSACTION.LIST_UNFETCHED });
    },
    [transactionDispatch]
  );

  useEffect(
    ()=> {
      if (transactionsLoading && transactionsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        transactionDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (transactionsLoading && transactionsFetchStatus === FETCH_STATUSES.LOADING) {

        transactionDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new TransactionRepository(adminToken);
        api.getList(transactionsPage)
        .then(res=> {
          
          if (res.status === 200) {

            transactionDispatch({
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

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          transactionDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      adminToken, 
      transactions.length, 
      transactionsPage, 
      transactionsLoading, 
      transactionsFetchStatus, 
      transactionDispatch, 
      listStatusUpdater
    ]
  );


  return [transactions, transactionsFetchStatus, transactionsPage, transactionsNumberOfPages, refetch, refresh];
}
