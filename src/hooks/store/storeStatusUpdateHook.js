import { useMemo, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreStatusUpdate(adminToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        store
      }
    } 
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const api = useMemo(function() { return new StoreRepository(adminToken); }, [adminToken]);

  async function onSubmit(status, statusValidity) {
  
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    if (!statusValidity.valid) {
      setFormError('_errors.This_field_is_required');
      return;
    }

    setLoading(true);

    try {

      const res = await api.updateStatus(store.id, { status });
          
      if (res.status === 200) {

        setFormSuccess(res.body.message);

        storeDispatch({
          type: STORE.FETCHED, 
          payload: { 
            id: String(store.id),
            store: res.body.data 
          }
        });

      } else if (res.status === 400) {
        
        setFormError(res.body.data[0].message);

      } else {
        throw new Error();
      }

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, formSuccess, formError];
}
