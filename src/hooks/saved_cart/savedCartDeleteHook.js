
import { useEffect, useState } from "react";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import SavedCartRepository from "../../repositories/SavedCartRepository";


export function useSavedCartDelete(userToken) {

  const [id, setId] = useState(null);

  const [response, setResponse] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(id, response) {
    if (!window.navigator.onLine) {
      response.onError('_errors.No_netowrk_connection');
    } else {
      setId(id);
      setResponse(response);
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new SavedCartRepository(userToken);

        api.delete(id)
        .then(res=> {

          if (res.status === 200) {

            response.onSuccess();

            setFetchStatus(FETCH_STATUSES.PENDING);

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
    [id, fetchStatus, userToken, response]
  );


  return onSubmit;
}
