
import { useCallback, useMemo } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryRouteLocationRepository from "../../repositories/DeliveryRouteLocationRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryRouteLocationFetch(userToken) {

  const { 
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryLocation,
        deliveryLocationID,
        deliveryLocationLoading,
        deliveryLocationError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryRouteLocationRepository(userToken); }, [userToken]);

  const unfetchDeliveryLocation = useCallback(
    function() { deliveryRouteDispatch({ type: DELIVERY_ROUTE.LOCATION_UNFETCHED }); },
    [deliveryRouteDispatch]
  );

  const fetchDeliveryLocation = useCallback(
    async function(ID) {

      if (deliveryLocationLoading) return;

      if (!window.navigator.onLine) {
        deliveryRouteDispatch({
          type: DELIVERY_ROUTE.LOCATION_ERROR_CHANGED,
          payload: { 
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION 
          }
        });
        return;
      } 

      deliveryRouteDispatch({ type: DELIVERY_ROUTE.LOCATION_FETCHING });

      try {

        const res = await api.get(ID);
          
        if (res.status === 200) {
          deliveryRouteDispatch({
            type: DELIVERY_ROUTE.LOCATION_FETCHED, 
            payload: {
              id: ID,
              deliveryLocation: res.body.data, 
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
          type: DELIVERY_ROUTE.LOCATION_ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, deliveryLocationLoading, deliveryRouteDispatch]
  );

  return [
    fetchDeliveryLocation,
    deliveryLocation,
    deliveryLocationLoading,
    deliveryLocationError,
    deliveryLocationID,
    unfetchDeliveryLocation
  ];
}
