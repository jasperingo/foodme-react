
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DELIVERY_ROUTE, getDeliveryRouteWeightFetchStatusAction } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteWeightRepository from "../../repositories/DeliveryRouteWeightRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteWeightFetch(userToken) {

  const { ID } = useParams();

  const { 
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryWeight,
        deliveryWeightID,
        deliveryWeightLoading,
        deliveryWeightFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (deliveryWeightFetchStatus !== FETCH_STATUSES.LOADING && deliveryWeightFetchStatus !== FETCH_STATUSES.DONE)
        deliveryRouteDispatch(getDeliveryRouteWeightFetchStatusAction(FETCH_STATUSES.LOADING, ID, true));
    },
    [ID, deliveryWeightFetchStatus, deliveryRouteDispatch]
  );
  
  useEffect(
    ()=> {

      if (deliveryWeightID !== null && deliveryWeightID !== ID) {
        
        deliveryRouteDispatch({ type: DELIVERY_ROUTE.UNFETCHED });

      } else if (deliveryWeightLoading && deliveryWeightFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryRouteDispatch(getDeliveryRouteWeightFetchStatusAction(FETCH_STATUSES.ERROR, ID, false));

      } else if (deliveryWeightLoading && deliveryWeightFetchStatus === FETCH_STATUSES.LOADING) {

        deliveryRouteDispatch(getDeliveryRouteWeightFetchStatusAction(FETCH_STATUSES.LOADING, ID, false));

        const api = new DeliveryRouteWeightRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {

            deliveryRouteDispatch({
              type: DELIVERY_ROUTE.WEIGHT_FETCHED, 
              payload: {
                deliveryWeight: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

          } else if (res.status === 404) {

            deliveryRouteDispatch(getDeliveryRouteWeightFetchStatusAction(FETCH_STATUSES.NOT_FOUND, ID, false));

          } else if (res.status === 403) {

            deliveryRouteDispatch(getDeliveryRouteWeightFetchStatusAction(FETCH_STATUSES.FORBIDDEN, ID, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryRouteDispatch(getDeliveryRouteWeightFetchStatusAction(FETCH_STATUSES.ERROR, ID, false));
        });
      }
    }
  );

  return [deliveryWeight, deliveryWeightFetchStatus, refetch];
}

