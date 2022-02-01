import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTransactionFetchStatusAction, TRANSACTION } from "../../context/actions/transactionActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useAppContext } from "../contextHook";


export function useTransactionFetch(userToken) {

  const { ID } = useParams();

  const { 
    transaction: { 
      transactionDispatch,
      transaction: {
        transaction,
        transactionID,
        transactionLoading,
        transactionFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (transactionFetchStatus !== FETCH_STATUSES.LOADING && transactionFetchStatus !== FETCH_STATUSES.DONE)
        transactionDispatch(getTransactionFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, transactionFetchStatus, transactionDispatch]
  );
  
  useEffect(
    ()=> {

      if (transactionID !== null && transactionID !== Number(ID)) {
        
        transactionDispatch({ type: TRANSACTION.UNFETCHED });

      } else if (transactionLoading && transactionFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        transactionDispatch(getTransactionFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (transactionLoading && transactionFetchStatus === FETCH_STATUSES.LOADING) {

        transactionDispatch(getTransactionFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));

        const api = new TransactionRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            transactionDispatch({
              type: TRANSACTION.FETCHED, 
              payload: {
                transaction: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {
            transactionDispatch(getTransactionFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));
          } else if (res.status === 403) {
            transactionDispatch(getTransactionFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          transactionDispatch(getTransactionFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );

  return [transaction, transactionFetchStatus, refetch];
}

