import { useMemo, useState } from "react";
import { useAppContext } from "../contextHook";
import { useAddressValidation } from "../address/addressValidationHook";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";

export function useDeliveryFirmAddressUpdate() {

  const {
    deliveryFirm: { 
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    }  
  } = useAppContext();


  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [streetError, setStreetError] = useState('');

  const [cityError, setCityError] = useState('');

  const [stateError, setStateError] = useState('');

  const api = useMemo(function() { return new DeliveryFirmRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  const validator = useAddressValidation();

  async function onSubmit(
    street,
    state,
    city,
    streetValidity,
    stateValidity,
    cityValidity,
  ) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      , 
      streetError, 
      stateError, 
      cityError
    ] = validator({ valid: true }, streetValidity, stateValidity, cityValidity, { valid: true });
    
    setStreetError(streetError);
    setCityError(stateError);
    setStateError(cityError);

    if (error) return;

    setLoading(true);

    try {
      
      const res = await api.updateAddress(deliveryFirm.id, { street, city, state });

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);
        
        deliveryFirmDispatch({
          type: DELIVERY_FIRM.FETCHED, 
          payload: { 
            id: String(deliveryFirm.id),
            deliveryFirm: res.body.data 
          }
        });

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'street':
              setStreetError(error.message);
              break;

            case 'city':
              setCityError(error.message);
                break;

            case 'state':
              setStateError(error.message);
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

  return [onSubmit, loading, formError, formSuccess, streetError, cityError, stateError];
}
