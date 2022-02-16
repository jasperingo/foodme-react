
import { useEffect, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteRepository from "../../repositories/DeliveryRouteRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

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

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [stateError, setStateError] = useState('');

  const [cityError, setCityError] = useState('');

  const [doorDeliveryError, setDoorDeliveryError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
    state,
    city,
    door_delivery,

    stateValidity,
    cityValidity,
    doorDeliveryValidity,
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    let error = false;
    
    if (!stateValidity.valid) {
      error = true;
      setStateError('_errors.This_field_is_required');
    } else {
      setStateError('');
    }

    if (!cityValidity.valid) {
      error = true;
      setCityError('_errors.This_field_is_required');
    } else {
      setCityError('');
    }
    
    if (!doorDeliveryValidity.valid) {
      error = true;
      setDoorDeliveryError('_errors.This_field_is_required');
    } else {
      setDoorDeliveryError('');
    }

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ state, city, door_delivery });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new DeliveryRouteRepository(deliveryFirmToken);

        api.update(deliveryRoute.id, data)
        .then(res=> {

          if (res.status === 200) {
            
            setFormSuccess(res.body.message);

            setFetchStatus(FETCH_STATUSES.PENDING);

            deliveryRouteDispatch({
              type: DELIVERY_ROUTE.FETCHED, 
              payload: {
                deliveryRoute: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
            
          } else if (res.status === 400) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
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
          
        })
        .catch(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
          setFormError('_errors.Something_went_wrong');
        });

      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, deliveryFirmToken, data, deliveryRoute, deliveryRouteDispatch]
  );

  return [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    stateError, 
    cityError, 
    doorDeliveryError
  ];
}
