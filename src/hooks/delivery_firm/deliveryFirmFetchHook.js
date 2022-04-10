
import { useCallback, useMemo } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmFetch(userToken) {

  const { 
    deliveryFirm : { 
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmID,
        deliveryFirmLoading,
        deliveryFirmError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryFirmRepository(userToken); }, [userToken]);

  const unfetchDeliveryFirm = useCallback(
    function() { deliveryFirmDispatch({ type: DELIVERY_FIRM.UNFETCHED }); },
    [deliveryFirmDispatch]
  );
  
  const fetchDeliveryFirm = useCallback(
    async function(ID) {

      if (deliveryFirmLoading) return;

      if (!window.navigator.onLine) {
        deliveryFirmDispatch({
          type: DELIVERY_FIRM.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      } 

      deliveryFirmDispatch({ type: DELIVERY_FIRM.FETCHING });

      try {
        const res = await api.get(ID);
          
        if (res.status === 200) {
          deliveryFirmDispatch({
            type: DELIVERY_FIRM.FETCHED, 
            payload: {
              id: ID,
              deliveryFirm: res.body.data
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
          type: DELIVERY_FIRM.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, deliveryFirmLoading, deliveryFirmDispatch]
  );

  return [
    fetchDeliveryFirm,
    deliveryFirm,
    deliveryFirmLoading,
    deliveryFirmError,
    deliveryFirmID,
    unfetchDeliveryFirm
  ];
}
