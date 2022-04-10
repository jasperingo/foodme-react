
import { useCallback, useMemo} from "react";
import { STORE } from "../../context/actions/storeActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreFetch(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        storeID,
        storeLoading,
        storeError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);

  const unfetchStore = useCallback(
    function() { storeDispatch({ type: STORE.UNFETCHED }); },
    [storeDispatch]
  );
  
  const fetchStore = useCallback(
    async function(ID) {

      if (storeLoading) return;
        
      if (!window.navigator.onLine) {
        storeDispatch({
          type: STORE.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      storeDispatch({ type: STORE.FETCHING });

      try {
        const res = await api.get(ID);
          
        if (res.status === 200) {
          storeDispatch({
            type: STORE.FETCHED, 
            payload: {
              id: ID,
              store: res.body.data,
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
        storeDispatch({
          type: STORE.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, storeLoading, storeDispatch]
  );

  return [
    fetchStore,
    store,
    storeLoading,
    storeError,
    storeID,
    unfetchStore
  ];
}
