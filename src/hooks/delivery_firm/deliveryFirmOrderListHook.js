
import { useCallback, useMemo } from "react";
import { ORDER } from "../../context/actions/orderActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmOrderList(userToken) {

  const { 
    deliveryFirm: { 
      deliveryFirmDispatch,
      deliveryFirm: {
        orders,
        ordersPage,
        ordersLoaded,
        ordersLoading,
        ordersNumberOfPages,
        ordersError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryFirmRepository(userToken); }, [userToken]);

  function refreshDeliveryFirmOrders() {
    deliveryFirmDispatch({ type: ORDER.LIST_UNFETCHED });
  }
  
  const fetchDeliveryFirmOrders = useCallback(
    async function(ID, status) {

      if (ordersLoading) return;

      if (!window.navigator.onLine) {
        deliveryFirmDispatch({
          type: ORDER.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      deliveryFirmDispatch({ type: ORDER.LIST_FETCHING });

      try {

        const res = await api.getOrdersList(ID, ordersPage, status);
          
        if (res.status === 200) {
          
          deliveryFirmDispatch({
            type: ORDER.LIST_FETCHED, 
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
          type: ORDER.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, ordersPage, ordersLoading, deliveryFirmDispatch]
  );

  return [
    fetchDeliveryFirmOrders,
    orders, 
    ordersLoaded,
    ordersLoading,
    ordersError,
    ordersPage, 
    ordersNumberOfPages,
    refreshDeliveryFirmOrders
  ];
}
