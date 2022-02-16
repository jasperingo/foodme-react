import { useEffect, useState } from "react";
import { FETCH_STATUSES } from "../../repositories/Fetch";
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


  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [streetError, setStreetError] = useState('');

  const [cityError, setCityError] = useState('');

  const [stateError, setStateError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const validator = useAddressValidation();

  function onSubmit(
    street,
    state,
    city,
    streetValidity,
    stateValidity,
    cityValidity,
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      , 
      streetError, 
      stateError, 
      cityError, 
      ,
    ] = validator({ valid: true }, streetValidity, stateValidity, cityValidity, { valid: true});
    
    setStreetError(streetError);
    setCityError(stateError);
    setStateError(cityError);

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ street, city, state });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      
      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new DeliveryFirmRepository(deliveryFirmToken);

        api.updateAddress(deliveryFirm.id, data)
        .then(res=> {

          if (res.status === 200) {
            
            setFormSuccess(res.body.message);
            
            deliveryFirmDispatch({
              type: DELIVERY_FIRM.FETCHED, 
              payload: {
                deliveryFirm: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
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
          
        })
        .catch(()=> {
          setFormError('_errors.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
        });

      } else if (dialog !== false) {
        setDialog(false);
      }

    }, 
    [data, deliveryFirm.id, deliveryFirmToken, fetchStatus, dialog, deliveryFirmDispatch]
  );

  return [onSubmit, dialog, formError, formSuccess, streetError, cityError, stateError];
}

