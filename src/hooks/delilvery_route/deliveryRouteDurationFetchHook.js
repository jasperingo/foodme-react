
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DELIVERY_ROUTE, getDeliveryRouteDurationFetchStatusAction } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteDurationRepository from "../../repositories/DeliveryRouteDurationRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteDurationFetch(userToken) {

  const { ID } = useParams();

  const { 
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryDuration,
        deliveryDurationID,
        deliveryDurationLoading,
        deliveryDurationFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (deliveryDurationFetchStatus !== FETCH_STATUSES.LOADING && deliveryDurationFetchStatus !== FETCH_STATUSES.DONE)
        deliveryRouteDispatch(getDeliveryRouteDurationFetchStatusAction(FETCH_STATUSES.LOADING, ID, true));
    },
    [ID, deliveryDurationFetchStatus, deliveryRouteDispatch]
  );
  
  useEffect(
    ()=> {

      if (deliveryDurationID !== null && deliveryDurationID !== ID) {
        
        deliveryRouteDispatch({ type: DELIVERY_ROUTE.UNFETCHED });

      } else if (deliveryDurationLoading && deliveryDurationFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryRouteDispatch(getDeliveryRouteDurationFetchStatusAction(FETCH_STATUSES.ERROR, ID, false));

      } else if (deliveryDurationLoading && deliveryDurationFetchStatus === FETCH_STATUSES.LOADING) {

        deliveryRouteDispatch(getDeliveryRouteDurationFetchStatusAction(FETCH_STATUSES.LOADING, ID, false));

        const api = new DeliveryRouteDurationRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {

            deliveryRouteDispatch({
              type: DELIVERY_ROUTE.DURATION_FETCHED, 
              payload: {
                deliveryDuration: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

          } else if (res.status === 404) {

            deliveryRouteDispatch(getDeliveryRouteDurationFetchStatusAction(FETCH_STATUSES.NOT_FOUND, ID, false));

          } else if (res.status === 403) {

            deliveryRouteDispatch(getDeliveryRouteDurationFetchStatusAction(FETCH_STATUSES.FORBIDDEN, ID, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryRouteDispatch(getDeliveryRouteDurationFetchStatusAction(FETCH_STATUSES.ERROR, ID, false));
        });
      }
    }
  );

  return [deliveryDuration, deliveryDurationFetchStatus, refetch];
}

