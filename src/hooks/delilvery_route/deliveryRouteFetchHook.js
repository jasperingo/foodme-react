
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DELIVERY_ROUTE, getDeliveryRouteFetchStatusAction } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteRepository from "../../repositories/DeliveryRouteRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteFetch(userToken) {

  const { ID } = useParams();

  const { 
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryRoute,
        deliveryRouteID,
        deliveryRouteLoading,
        deliveryRouteFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (deliveryRouteFetchStatus !== FETCH_STATUSES.LOADING && deliveryRouteFetchStatus !== FETCH_STATUSES.DONE)
        deliveryRouteDispatch(getDeliveryRouteFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, deliveryRouteFetchStatus, deliveryRouteDispatch]
  );
  
  useEffect(
    ()=> {

      if (deliveryRouteID !== null && deliveryRouteID !== Number(ID)) {
        
        deliveryRouteDispatch({ type: DELIVERY_ROUTE.UNFETCHED });

      } else if (deliveryRouteLoading && deliveryRouteFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryRouteDispatch(getDeliveryRouteFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (deliveryRouteLoading && deliveryRouteFetchStatus === FETCH_STATUSES.LOADING) {

        deliveryRouteDispatch(getDeliveryRouteFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));

        const api = new DeliveryRouteRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            deliveryRouteDispatch({
              type: DELIVERY_ROUTE.FETCHED, 
              payload: {
                deliveryRoute: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {

            deliveryRouteDispatch(getDeliveryRouteFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));

          } else if (res.status === 403) {

            deliveryRouteDispatch(getDeliveryRouteFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryRouteDispatch(getDeliveryRouteFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );

  return [deliveryRoute, deliveryRouteFetchStatus, refetch];
}

