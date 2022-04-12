import { useCallback, useState, useMemo } from "react";
import { STORE } from "../../context/actions/storeActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { useStoreAuthGet, useStoreAuthUnset } from "./storeAuthStorageHook";

export function useStoreAuthFetch() {

  const { 
    store: { storeDispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const [storeId, storeToken, storeAdminID] = useStoreAuthGet();

  const unsetAuth = useStoreAuthUnset();

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const api = useMemo(function() { return new StoreRepository(storeToken); }, [storeToken]);
  
  const fetchStore = useCallback(
    async function() {

      if (loading) return;
      
      if (!window.navigator.onLine) {
        setError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
        return;
      }

      setLoading(true);

      try {

        const res = await api.get(storeId);

        if (res.status === 200) {
          
          storeDispatch({
            type: STORE.AUTHED, 
            payload: { 
              token: storeToken, 
              adminID: storeAdminID,
              store: res.body.data
            }
          });
          
          messageCount(storeToken);
          
          newMessage(storeToken, res.body.data.user.id);

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
    [api, loading, storeAdminID, storeId, storeToken, storeDispatch, unsetAuth, messageCount, newMessage]
  );
  
  return [storeId, fetchStore, success, error];
}
