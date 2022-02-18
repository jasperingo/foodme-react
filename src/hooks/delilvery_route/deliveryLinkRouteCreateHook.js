
import { useEffect, useState } from "react";
import DeliveryRouteRepository from "../../repositories/DeliveryRouteRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDeliveryLinkRouteCreate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    }
  } = useAppContext();

  const [id, setId] = useState(0);

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [originError, setOriginError] = useState('');

  const [destinationError, setDestinationError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(origin_route_id, destination_route_id) {
    
    setFormError(null);
    setFormSuccess(null);
    
    let error = false;
    
    if (origin_route_id === '') {
      error = true;
      setOriginError('_errors.This_field_is_required');
    } else {
      setOriginError('');
    }

    if (destination_route_id === '') {
      error = true;
      setDestinationError('_errors.This_field_is_required');
    } else {
      setDestinationError('');
    }

    if (!error && origin_route_id === destination_route_id) {
      error = true;
      setOriginError('_errors.This_field_is_invalid');
      setDestinationError('_errors.This_field_is_invalid');
    }

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ origin_route_id, destination_route_id });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new DeliveryRouteRepository(deliveryFirmToken);

        api.createLink(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);
            
            setId(res.body.data.id);

            setFetchStatus(FETCH_STATUSES.PENDING);
            
          } else if (res.status === 400) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
            for (let error of res.body.data) {

              switch(error.name) {

                case 'origin_route_id':
                  setOriginError(error.message);
                  break;

                case 'destination_route_id':
                  setDestinationError(error.message);
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
    [fetchStatus, dialog, deliveryFirmToken, data]
  );

  return [
    onSubmit, 
    id, 
    dialog, 
    formError, 
    formSuccess, 
    originError, 
    destinationError,
  ];
}
