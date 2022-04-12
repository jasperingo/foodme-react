
import { useCallback, useMemo } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmList(userToken) {

  const { 
    deliveryFirm: {
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirms,
        deliveryFirmsPage,
        deliveryFirmsError,
        deliveryFirmsLoaded,
        deliveryFirmsLoading,
        deliveryFirmsNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryFirmRepository(userToken); }, [userToken]);

  function refreshDeliveryFirms() {
    deliveryFirmDispatch({ type: DELIVERY_FIRM.LIST_UNFETCHED }); 
  }
  
  const fetchDeliveryFirms = useCallback(
    async function() {

      if (deliveryFirmsLoading) return;

      if (!window.navigator.onLine) {
        deliveryFirmDispatch({
          type: DELIVERY_FIRM.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      deliveryFirmDispatch({ type: DELIVERY_FIRM.LIST_FETCHING });
      
      try {

        const res = await api.getList(deliveryFirmsPage);
          
        if (res.status === 200) {

          deliveryFirmDispatch({
            type: DELIVERY_FIRM.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
          });

        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
      } catch(error) {
        deliveryFirmDispatch({
          type: DELIVERY_FIRM.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
      
    },
    [
      api, 
      deliveryFirmsPage, 
      deliveryFirmsLoading, 
      deliveryFirmDispatch,
    ]
  );

  return [
    fetchDeliveryFirms,
    deliveryFirms, 
    deliveryFirmsLoading,
    deliveryFirmsLoaded,
    deliveryFirmsError,
    deliveryFirmsPage, 
    deliveryFirmsNumberOfPages,
    refreshDeliveryFirms
  ];
}
