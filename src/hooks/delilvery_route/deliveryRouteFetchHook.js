
import { useCallback, useMemo } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryRouteRepository from "../../repositories/DeliveryRouteRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteFetch(userToken) {

  const { 
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryRoute,
        deliveryRouteID,
        deliveryRouteLoading,
        deliveryRouteError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryRouteRepository(userToken); }, [userToken]);

  const unfetchDeliveryRoute = useCallback(
    function() { deliveryRouteDispatch({ type: DELIVERY_ROUTE.UNFETCHED }); },
    [deliveryRouteDispatch]
  );
  
  const fetchDeliveryRoute = useCallback(
    async function(ID) {

      if (deliveryRouteLoading) return;

      if (!window.navigator.onLine) {
        deliveryRouteDispatch({
          type: DELIVERY_ROUTE.ERROR_CHANGED,
          payload: { 
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION 
          }
        });
        return;
      } 

      deliveryRouteDispatch({ type: DELIVERY_ROUTE.FETCHING });

      try {

        const res = await api.get(ID);
          
        if (res.status === 200) {
          deliveryRouteDispatch({
            type: DELIVERY_ROUTE.FETCHED, 
            payload: {
              id: ID,
              deliveryRoute: res.body.data
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
      } catch(error) {
        deliveryRouteDispatch({
          type: DELIVERY_ROUTE.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, deliveryRouteLoading, deliveryRouteDispatch]
  );

  return [
    fetchDeliveryRoute,
    deliveryRoute,
    deliveryRouteLoading,
    deliveryRouteError,
    deliveryRouteID,
    unfetchDeliveryRoute
  ];
}
