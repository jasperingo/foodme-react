import { useCallback, useMemo } from "react";
import { SAVED_CART } from "../../context/actions/savedCartActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreSavedCartList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        savedCarts,
        savedCartsPage,
        savedCartsLoaded,
        savedCartsLoading,
        savedCartsNumberOfPages,
        savedCartsError
      } 
    }, 
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);

  function refreshStoreSavedCarts() {
    storeDispatch({ type: SAVED_CART.LIST_UNFETCHED });
  }

  const fetchStoreSavedCarts = useCallback(
    async function(ID) {

      if (savedCartsLoading) return;

      if (!window.navigator.onLine) {
        storeDispatch({
          type: SAVED_CART.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      storeDispatch({ type: SAVED_CART.LIST_FETCHING });

      try {
        
        const res = await api.getSavedCartsList(ID, savedCartsPage);
          
        if (res.status === 200) {
          storeDispatch({
            type: SAVED_CART.LIST_FETCHED, 
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
        storeDispatch({
          type: SAVED_CART.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      savedCartsPage, 
      savedCartsLoading,
      storeDispatch
    ]
  );

  return [
    fetchStoreSavedCarts,
    savedCarts, 
    savedCartsLoading,
    savedCartsLoaded,
    savedCartsError,
    savedCartsPage, 
    savedCartsNumberOfPages,
    refreshStoreSavedCarts
  ];
}
