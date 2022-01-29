import { useCallback, useEffect } from "react";
import { getTransactionsListFetchStatusAction, TRANSACTION } from "../../context/actions/transactionActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useCustomerTransactionList() {

  const { 
    transaction: { 
      transactionDispatch,
      transaction: {
        transactions,
        transactionsPage,
        transactionsNumberOfPages,
        transactionsFetchStatus
      } 
    },
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();


  const refetch = useCallback(
    ()=> {
      if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
        transactionDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING));
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
      if (transactionsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        transactionDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (transactionsFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new CustomerRepository(customerToken);
        api.getTransactionsList(customer.id, transactionsPage)
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
          transactionDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [customer.id, customerToken, transactions.length, transactionsPage, transactionsFetchStatus, transactionDispatch, listStatusUpdater]
  );


  return [transactions, transactionsFetchStatus, transactionsPage, transactionsNumberOfPages, refetch, refresh];
}
