
import { useCallback, useEffect } from "react";
import { getTransactionBalanceFetchStatusAction, TRANSACTION } from "../../context/actions/transactionActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useDeliveryFirmTransactionBalance(userToken) {

  const { 
    deliveryFirm: { 
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
        transactionBalance,
        transactionBalanceLoading,
        transactionBalanceFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (transactionBalanceFetchStatus !== FETCH_STATUSES.LOADING) 
        deliveryFirmDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [deliveryFirmDispatch, transactionBalanceFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (transactionBalanceLoading && transactionBalanceFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryFirmDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (transactionBalanceLoading && transactionBalanceFetchStatus === FETCH_STATUSES.LOADING) {
        
        deliveryFirmDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new DeliveryFirmRepository(userToken);
        api.getTransactionBalance(deliveryFirm.id)
        .then(res=> {
          
          if (res.status === 200) {
            
            deliveryFirmDispatch({
              type: TRANSACTION.BALANCE_FETCHED, 
              payload: {
                balance: res.body.data.balance, 
                fetchStatus: FETCH_STATUSES.DONE
              }
            });

          } else if (res.status === 404) {

            deliveryFirmDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            deliveryFirmDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryFirmDispatch(getTransactionBalanceFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      deliveryFirm.id,
      transactionBalanceLoading, 
      transactionBalanceFetchStatus, 
      userToken, 
      deliveryFirmDispatch
    ]
  );

  return [transactionBalance, transactionBalanceFetchStatus, refetch];
}


