
import { useMemo, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteLocationRepository from "../../repositories/DeliveryRouteLocationRepository";
import { useAppContext } from "../contextHook";
import { useDeliveryRouteLocationValidation } from "./deliveryRouteLocationValidationHook";

export function useDeliveryRouteLocationCreate(delivery_route_id) {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    },
    deliveryRoute : { 
      deliveryRouteDispatch,
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [cityError, setCityError] = useState('');

  const [stateError, setStateError] = useState('');

  const validator = useDeliveryRouteLocationValidation();

  const api = useMemo(function() { return new DeliveryRouteLocationRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit(state, city, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    const [error, stateError, cityError] = validator(validity);
    
    setCityError(cityError);
    setStateError(stateError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.create({ state, city, delivery_route_id });

      if (res.status === 201) {
        
        deliveryRouteDispatch({
          type: DELIVERY_ROUTE.LOCATION_CREATED,
          payload: { deliveryLocation: res.body.data }
        });
        
        setFormSuccess(res.body.message);
        
      } else if (res.status === 400) {

        for (let error of res.body.data) {

          switch(error.name) {

            case 'state':
              setStateError(error.message);
              break;

            case 'city':
              setCityError(error.message);
              break;
              
            case 'delivery_route_id':
              setFormError(error.message);
              break;

            default:
          }
        }

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
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    stateError, 
    cityError
  ];
}
