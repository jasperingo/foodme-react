
import { useCallback, useEffect } from "react";
import { getTransactionsListFetchStatusAction, TRANSACTION } from "../../context/actions/transactionActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useDeliveryFirmTransactionList(userToken) {

  const { 
    deliveryFirm: { 
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
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
        deliveryFirmDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [deliveryFirmDispatch, transactionsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (transactionsLoading && transactionsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryFirmDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (transactionsLoading && transactionsFetchStatus === FETCH_STATUSES.LOADING) {
        
        deliveryFirmDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new DeliveryFirmRepository(userToken);
        api.getTransactionsList(deliveryFirm.id, transactionsPage)
        .then(res=> {
          
          if (res.status === 200) {
            
            deliveryFirmDispatch({
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

            deliveryFirmDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            deliveryFirmDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryFirmDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      deliveryFirm.id, 
      transactions, 
      transactionsPage, 
      transactionsLoading, 
      transactionsFetchStatus, 
      userToken, 
      deliveryFirmDispatch, 
      listStatusUpdater
    ]
  );

  return [transactions, transactionsFetchStatus, transactionsPage, transactionsNumberOfPages, refetch];
}

