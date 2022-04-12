import { useState, useMemo } from 'react';
import { DELIVERY_FIRM } from '../../context/actions/deliveryFirmActions';
import DeliveryFirmRepository from '../../repositories/DeliveryFirmRepository';
import { useAppContext } from '../contextHook';

export function useDeliveryFirmPhotoUpdate() {

  const { 
    deliveryFirm: { 
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    }
  } = useAppContext();

  
  const [photo, setPhoto] = useState(null);
  
  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  const form = useMemo(function() { return new FormData(); }, []);

  const api = useMemo(function() { return new DeliveryFirmRepository(deliveryFirmToken, null); }, [deliveryFirmToken]);

  async function submit() {

    if (loading || photo === null) return;

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setLoading(true);

    form.append('photo', photo);
    
    try {
    
      const res = await api.updatePhoto(deliveryFirm.id, form);

      if (res.status === 200) {

        setPhotoUploaded(true);

        deliveryFirmDispatch({
          type: DELIVERY_FIRM.FETCHED, 
          payload: { deliveryFirm: res.body.data }
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
