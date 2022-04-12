
import { useCallback, useMemo } from "react";
import { STORE } from "../../context/actions/storeActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        stores,
        storesPage,
        storesError,
        storesLoaded,
        storesLoading,
        storesNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);

  function refreshStores() {
    storeDispatch({ type: STORE.LIST_UNFETCHED }); 
  }
  
  const fetchStores = useCallback(
    async function() {

      if (storesLoading) return;

      if (!window.navigator.onLine) {
        storeDispatch({
          type: STORE.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      storeDispatch({ type: STORE.LIST_FETCHING });
      
      try {

        const res = await api.getList(storesPage);
          
        if (res.status === 200) {

          storeDispatch({
            type: STORE.LIST_FETCHED, 
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
        storeDispatch({
          type: STORE.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      storesPage, 
      storesLoading,
      storeDispatch, 
    ]
  );

  return [
    fetchStores,
    stores, 
    storesLoading,
    storesLoaded,
    storesError,
    storesPage, 
    storesNumberOfPages,
    refreshStores
  ];
}
