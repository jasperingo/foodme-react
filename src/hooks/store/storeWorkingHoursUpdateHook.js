import { useCallback, useEffect, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreWorkingHoursUpdate() {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        storeToken
      } 
    } 
  } = useAppContext();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);
  
  
  const update = useCallback(
    () => {
      const api = new StoreRepository(storeToken);
      
      api.updateWorkingHours(store.id, data)
      .then(res=> {

        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          storeDispatch({
            type: STORE.FETCHED, 
            payload: { 
              store: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

        } else if (res.status === 400) {
          
          setFormError('_errors.invalid_working_hours_list');
          
        } else {
          throw new Error();
        }

      })
      .catch(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
        setFormError('_errors.Something_went_wrong');
      })
      .finally(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
      });
    }, 
    [data, store.id, storeToken, storeDispatch]
  );

  function onSubmit(workingHours) {

    console.log(workingHours);

    setFormError(null);
    setFormSuccess(null);
    
    if (workingHours.length === 0) {
      setFormError('_errors.Empty_working_hours_list');
    } else if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (workingHours.length > 0) {
      setDialog(true);
      setData({ working_hours: workingHours });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        update();
      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, update]
  );

  return [onSubmit, dialog, formError, formSuccess];
}
