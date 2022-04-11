import { useState, useMemo } from 'react';
import { STORE } from '../../context/actions/storeActions';
import StoreRepository from '../../repositories/StoreRepository';
import { useAppContext } from '../contextHook';

export function useStorePhotoUpdate() {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        storeToken
      } 
    }
  } = useAppContext();

  
  const [photo, setPhoto] = useState(null);
  
  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  const form = useMemo(function() { return new FormData(); }, []);

  const api = useMemo(function() { return new StoreRepository(storeToken, null); }, [storeToken]);

  async function submit() {

    if (loading || photo === null) return;

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setLoading(true);

    form.append('photo', photo);
    
    try {
    
      const res = await api.updatePhoto(store.id, form);

      if (res.status === 200) {

        setPhotoUploaded(true);

        storeDispatch({
          type: STORE.FETCHED, 
          payload: { store: res.body.data }
        });

      } else if (res.status === 400) {

        const error = res.body.data[0];

        if (error.name === 'photo') 
          setFormError(error.message);

      } else {
        throw new Error();
      }
    
    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [
    submit,
    photo,
    setPhoto,
    loading,
    photoUploaded,
    formError
  ];
}
