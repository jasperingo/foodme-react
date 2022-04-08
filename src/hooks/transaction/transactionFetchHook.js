import { useCallback, useMemo } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useAppContext } from "../contextHook";

export function useTransactionFetch(userToken) {

  const { 
    transaction: { 
      transactionDispatch,
      transaction: {
        transaction,
        transactionID,
        transactionError,
        transactionLoading
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new TransactionRepository(userToken); }, [userToken]);

  const unfetchTransaction = useCallback(
    function() { transactionDispatch({ type: TRANSACTION.UNFETCHED }); },
    [transactionDispatch]
  );
  
  const fetchTransaction = useCallback(
    async function(ID) {

      if (!window.navigator.onLine) {
        transactionDispatch({
          type: TRANSACTION.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      } 
      
      transactionDispatch({ type: TRANSACTION.FETCHING });

      try { 
        const res = await api.get(ID);
          
        if (res.status === 200) {
          transactionDispatch({
            type: TRANSACTION.FETCHED, 
            payload: {
              transaction: res.body.data, 
              id: String(res.body.data.id)
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
        transactionDispatch({
          type: TRANSACTION.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, transactionDispatch]
  );

  return [
    fetchTransaction,
    transaction,
    transactionLoading,
    transactionError,
    transactionID,
    unfetchTransaction
  ];
}
