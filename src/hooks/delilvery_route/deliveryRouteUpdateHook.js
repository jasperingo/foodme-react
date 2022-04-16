
import { useMemo, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteRepository from "../../repositories/DeliveryRouteRepository";
import { useAppContext } from "../contextHook";
import { useDeliveryRouteValidation } from "./deliveryRouteValidationHook";

export function useDeliveryRouteUpdate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    },
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryRoute
      } 
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [doorDeliveryError, setDoorDeliveryError] = useState('');

  const validator = useDeliveryRouteValidation();

  const api = useMemo(function() { return new DeliveryRouteRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit(name, door_delivery, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    
    const [error, nameError, doorDelivevryError] = validator(validity);
    
    setNameError(nameError);
    setDoorDeliveryError(doorDelivevryError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.update(deliveryRoute.id, { name, door_delivery });

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);

        deliveryRouteDispatch({
          type: DELIVERY_ROUTE.FETCHED, 
          payload: { 
            id: String(deliveryRoute.id),
            deliveryRoute: res.body.data 
          }
        });
        
      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
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
    loading, 
    formError, 
    formSuccess,
    nameError, 
    doorDeliveryError
  ];
}
