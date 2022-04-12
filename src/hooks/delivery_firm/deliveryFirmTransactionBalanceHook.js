
import { useCallback, useMemo } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmTransactionBalance(userToken) {

  const { 
    deliveryFirm: { 
      deliveryFirmDispatch,
      deliveryFirm: {
        transactionBalance,
        transactionBalanceLoading,
        transactionBalanceError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryFirmRepository(userToken); }, [userToken]);

  function refreshDeliveryFirmTransactionBalance() {
    deliveryFirmDispatch({ type: TRANSACTION.BALANCE_UNFETCHED });
  }
  
  const fetchDeliveryFirmTransactionBalance = useCallback(
    async function(ID) {

      if (transactionBalanceLoading) return;
      
      if (!window.navigator.onLine) {
        deliveryFirmDispatch({
          type: TRANSACTION.BALANCE_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      deliveryFirmDispatch({ type: TRANSACTION.BALANCE_FETCHING });
      
      try {

        const res = await api.getTransactionBalance(ID);
          
          if (res.status === 200) {
            
            deliveryFirmDispatch({
              type: TRANSACTION.BALANCE_FETCHED, 
              payload: { balance: res.body.data.balance }
            });

          } else if (res.status === 404) {
            throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
          } else if (res.status === 403) {
            throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
          } else {
            throw new Error();
          }

        } catch(error) {
          deliveryFirmDispatch({
            type: TRANSACTION.BALANCE_ERROR_CHANGED,
            payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
          });
      }
    },
    [
      api,
      transactionBalanceLoading,
      deliveryFirmDispatch
    ]
  );

  return [
    fetchDeliveryFirmTransactionBalance,
    transactionBalance, 
    transactionBalanceLoading,
    transactionBalanceError,
    refreshDeliveryFirmTransactionBalance
  ];
}
