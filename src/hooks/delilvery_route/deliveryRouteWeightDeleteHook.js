
import { useEffect, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteWeightRepository from "../../repositories/DeliveryRouteWeightRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteWeightDelete() {

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

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit() { 
    setDialog(true);
    setFormError(null);
    setFormSuccess(null);
    setFetchStatus(FETCH_STATUSES.LOADING);
  }
  
  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new DeliveryRouteWeightRepository(deliveryFirmToken);

        api.delete(deliveryWeight.id)
        .then(res=> {

          if (res.status === 200) {
            
            setFormSuccess(res.body.message);

            setFetchStatus(FETCH_STATUSES.PENDING);

            deliveryRouteDispatch({
              type: DELIVERY_ROUTE.WEIGHT_DELETED,
              payload: deliveryWeight.id
            });

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
    [fetchStatus, dialog, deliveryFirmToken, deliveryWeight, deliveryRouteDispatch]
  );

  return [
    onSubmit, 
    dialog, 
    formSuccess,
    formError
  ];
}

