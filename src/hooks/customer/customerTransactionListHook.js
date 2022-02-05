import { useCallback, useEffect } from "react";
import { getTransactionsListFetchStatusAction, TRANSACTION } from "../../context/actions/transactionActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useCustomerTransactionList(userId, userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        transactions: {
          transactions,
          transactionsPage,
          transactionsLoading,
          transactionsNumberOfPages,
          transactionsFetchStatus
        } 
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();


  const refetch = useCallback(
    ()=> {
      if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
        dispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [dispatch, transactionsFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      dispatch({ type: TRANSACTION.LIST_UNFETCHED });
    },
    [dispatch]
  );

  useEffect(
    ()=> {
      if (transactionsLoading && transactionsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (transactionsLoading && transactionsFetchStatus === FETCH_STATUSES.LOADING) {

        dispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new CustomerRepository(userToken);
        api.getTransactionsList(userId, transactionsPage)
        .then(res=> {
          
          if (res.status === 200) {
            dispatch({
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
          dispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      userId, 
      userToken, 
      transactions.length, 
      transactionsPage, 
      transactionsLoading, 
      transactionsFetchStatus, 
      dispatch, 
      listStatusUpdater
    ]
  );


  return [transactions, transactionsFetchStatus, transactionsPage, transactionsNumberOfPages, refetch, refresh];
}
