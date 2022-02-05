import { useEffect, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreStatusUpdate(storeId, adminToken) {

  const { 
    store: { 
      storeDispatch
    } 
  } = useAppContext();

  const [data, setData] = useState(false);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [statusError, setStatusError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
    status,
    statusValidity
  ) {
  
    setFormError('');
    setFormSuccess('');

    if (!statusValidity.valid) {
      setStatusError('_errors.This_field_is_required');
    } else if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else {
      setDialog(true);
      setData({ status });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new StoreRepository(adminToken);

        api.updateStatus(storeId, data)
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
            
            setStatusError(res.body.data[0].message);
  
          } else {
            throw new Error();
          }
    
        })
        .catch(()=> {
          setFormError('_errors.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
        });

      } else if (dialog !== false) {
        setDialog(false);
      }

    }, 
    [data, storeId, adminToken, fetchStatus, dialog, storeDispatch]
  );

  return [onSubmit, dialog, formError, formSuccess, statusError];
}
