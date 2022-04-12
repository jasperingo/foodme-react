
import { useMemo, useState } from "react";
import DeliveryRouteRepository from "../../repositories/DeliveryRouteRepository";
import { useAppContext } from "../contextHook";
import { useDeliveryRouteValidation } from "./deliveryRouteValidationHook";

export function useDeliveryRouteCreate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    }
  } = useAppContext();

  const [id, setId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [stateError, setStateError] = useState('');

  const [cityError, setCityError] = useState('');

  const [doorDeliveryError, setDoorDeliveryError] = useState('');

  const validator = useDeliveryRouteValidation();

  const api = useMemo(function() { return new DeliveryRouteRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit(state, city, door_delivery, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    
    const [error, stateError, cityError, doorDelivevryError] = validator(validity);
    
    setStateError(stateError);
    setCityError(cityError);
    setDoorDeliveryError(doorDelivevryError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.create({ state, city, door_delivery });

      if (res.status === 201) {
        
        setFormSuccess(res.body.message);
        
        setId(res.body.data.id);
        
      } else if (res.status === 400) {

        for (let error of res.body.data) {

          switch(error.name) {

            case 'state':
              setStateError(error.message);
              break;

            case 'city':
              setCityError(error.message);
              break;

            case 'door_delivery':
              setDoorDeliveryError(error.message);
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
    id, 
    loading, 
    formError, 
    formSuccess, 
    stateError, 
    cityError, 
    doorDeliveryError
  ];
}
