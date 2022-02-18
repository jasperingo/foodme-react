
import { useEffect, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteRepository from "../../repositories/DeliveryRouteRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteDelete() {

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

  const [dialog, setDialog] = useState(null);

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
        const api = new DeliveryRouteRepository(deliveryFirmToken);

        api.delete(deliveryRoute.id)
        .then(res=> {

          if (res.status === 200) {

            setFormSuccess(res.body.message);
            deliveryRouteDispatch({ type: DELIVERY_ROUTE.UNFETCHED });

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
    [deliveryRoute, deliveryFirmToken, fetchStatus, dialog, deliveryRouteDispatch]
  )


  return [onSubmit, dialog, formSuccess, formError];
}
