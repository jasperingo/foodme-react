import { useCallback, useMemo, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { useDeliveryFirmAuthGet, useDeliveryFirmAuthUnset } from "./deliveryFirmAuthStorageHook";

export function useDeliveryFirmAuthFetch() {

  const { 
    deliveryFirm: { deliveryFirmDispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const unsetAuth = useDeliveryFirmAuthUnset();

  const [deliveryFirmId, deliveryFirmToken, deliveryFirmAdminID] = useDeliveryFirmAuthGet();

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const api = useMemo(function() { return new DeliveryFirmRepository(deliveryFirmToken); }, [deliveryFirmToken]);
  
  const fetchDeliveryFirm = useCallback(
    async function() {

      if (loading) return;
      
      if (!window.navigator.onLine) {
        setError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
        return;
      }

      setLoading(true);

      try {

        const res = await api.get(deliveryFirmId);

        if (res.status === 200) {
          
          deliveryFirmDispatch({
            type: DELIVERY_FIRM.AUTHED, 
            payload: { 
              token: deliveryFirmToken, 
              adminID: deliveryFirmAdminID,
              deliveryFirm: res.body.data
            }
          });
          
          messageCount(deliveryFirmToken);
          
          newMessage(deliveryFirmToken, res.body.data.user.id);

          setSuccess(true);

        } else if (res.status === 401) {
          unsetAuth();
        } else {
          throw new Error();
        }

      } catch(error) {
        setError(NetworkErrorCodes.UNKNOWN_ERROR);
      } finally {
        setLoading(false);
      }
    },
    [api, loading, deliveryFirmAdminID, deliveryFirmId, deliveryFirmToken, deliveryFirmDispatch, unsetAuth, messageCount, newMessage]
  );
  
  return [deliveryFirmId, fetchDeliveryFirm, success, error];
}
