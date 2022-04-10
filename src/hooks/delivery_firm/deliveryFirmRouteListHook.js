
import { useCallback, useMemo } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmRouteList(userToken) {

  const { 
    deliveryFirm: {
      deliveryFirmDispatch,
      deliveryFirm: {
        routes,
        routesPage,
        routesError,
        routesLoaded,
        routesLoading,
        routesNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryFirmRepository(userToken); }, [userToken]);

  function refreshDeliveryFirmRoutes() {
    deliveryFirmDispatch({ type: DELIVERY_ROUTE.LIST_UNFETCHED }); 
  }
  
  const fetchDeliveryFirmRoutes = useCallback(
    async function(ID) {

      if (routesLoading) return;
      
      if (!window.navigator.onLine) {
        deliveryFirmDispatch({
          type: DELIVERY_ROUTE.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      deliveryFirmDispatch({ type: DELIVERY_ROUTE.LIST_FETCHING });
        
      try {
        const res = await api.getRoutesList(ID, routesPage);
        
        if (res.status === 200) {
          deliveryFirmDispatch({
            type: DELIVERY_ROUTE.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
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
        deliveryFirmDispatch({
          type: DELIVERY_ROUTE.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, routesPage, routesLoading, deliveryFirmDispatch]
  );

  return [
    fetchDeliveryFirmRoutes,
    routes, 
    routesLoading,
    routesError,
    routesLoaded,
    routesPage, 
    routesNumberOfPages,
    refreshDeliveryFirmRoutes
  ];
}
