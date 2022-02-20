
import { useEffect, useState } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useAppContext } from "../contextHook";

export function useTransactionStatusUpdate(userToken) {

  const { 
    transaction: { 
      transactionDispatch,
      transaction: {
        transaction
      }
    }
  } = useAppContext();

  const [data, setData] = useState(null);

  const [response, setResponse] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(status, response) {
    if (!window.navigator.onLine) {
      response.onError('_errors.No_netowrk_connection');
    } else {
      setResponse(response);
      setData({ status });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      
      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new TransactionRepository(userToken);

        api.updateStatus(transaction.id, data)
        .then(res=> {

          if (res.status === 200) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
            response.onSuccess();
            
            transactionDispatch({
              type: TRANSACTION.FETCHED, 
              payload: {
                transaction: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
            
          } else if (res.status === 400) {
            
            setFetchStatus(FETCH_STATUSES.PENDING);

            response.onError(res.body.data[0].message);

          } else {
            throw new Error();
          }
          
        })
        .catch(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
          response.onError('_errors.Something_went_wrong');
        });

      }

    }, 
    [data, transaction, userToken, fetchStatus, response, transactionDispatch]
  );

  return onSubmit;
}

