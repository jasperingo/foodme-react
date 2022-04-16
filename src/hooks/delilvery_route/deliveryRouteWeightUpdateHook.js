
import { useMemo, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteWeightRepository from "../../repositories/DeliveryRouteWeightRepository";
import { useAppContext } from "../contextHook";
import { useDeliveryRouteWeightValidation } from "./deliveryRouteWeightValidationHook";

export function useDeliveryRouteWeightUpdate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    },
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryWeight
      } 
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [minError, setMinError] = useState('');

  const [maxError, setMaxError] = useState('');

  const [feeError, setFeeError] = useState('');

  const validator = useDeliveryRouteWeightValidation();

  const api = useMemo(function() { return new DeliveryRouteWeightRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit(minimium, maximium, fee, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    validity.minimium = minimium;
    validity.maximium = maximium;

    const [
      error, 
      minError, 
      maxError, 
      feeError, 
    ] = validator(validity);

    setMinError(minError);
    setMaxError(maxError);
    setFeeError(feeError);

    if (error) return;

    setLoading(true);

    try {

      const res = await api.update(deliveryWeight.id, { minimium, maximium, fee });

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);

        deliveryRouteDispatch({
          type: DELIVERY_ROUTE.WEIGHT_UPDATED,
          payload: { deliveryWeight: res.body.data }
        });
        
      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'minimium':
              setMinError(error.message);
              break;

            case 'maximium':
              setMaxError(error.message);
              break;

            case 'fee':
              setFeeError(error.message);
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
    minError, 
    maxError, 
    feeError
  ];
}
