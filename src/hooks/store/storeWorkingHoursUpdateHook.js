import { useState, useMemo } from "react";
import { STORE } from "../../context/actions/storeActions";
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

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new StoreRepository(storeToken); }, [storeToken]);

  async function onSubmit(workingHours) {

    setFormError(null);
    setFormSuccess(null);
    
    if (workingHours.length === 0) {
      setFormError('_errors.Empty_working_hours_list');
    }

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } 

    setLoading(true);

    try {
      const res = await api.updateWorkingHours(store.id, { working_hours: workingHours });

      if (res.status === 200) {

        setFormSuccess(res.body.message);
        
        storeDispatch({
          type: STORE.FETCHED, 
          payload: { store: res.body.data }
        });

      } else if (res.status === 400) {
        setFormError('_errors.invalid_working_hours_list');
      } else {
        throw new Error();
      }

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, formError, formSuccess];
}
