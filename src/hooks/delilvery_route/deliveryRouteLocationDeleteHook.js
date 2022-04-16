
import { useMemo, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteLocationRepository from "../../repositories/DeliveryRouteLocationRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteLocationDelete() {

  const {
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    },
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryLocation
      } 
    }
  } = useAppContext();

  const [loading, setLoading] = useState(null);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new DeliveryRouteLocationRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit() {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    setLoading(true);

    try {
      
      const res = await api.delete(deliveryLocation.id);

      if (res.status === 200) {

        setFormSuccess(res.body.message);

        deliveryRouteDispatch({ 
          type: DELIVERY_ROUTE.LOCATION_DELETED,
          payload: { id: deliveryLocation.id }
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
