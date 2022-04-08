
import { useCallback, useMemo } from "react";
import { SAVED_CART } from "../../context/actions/savedCartActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import SavedCartRepository from "../../repositories/SavedCartRepository";
import { useAppContext } from "../contextHook";

export function useSavedCartFetch(userToken) {

  const { 
    savedCart: { 
      savedCartDispatch,
      savedCart: {
        savedCart,
        savedCartID,
        savedCartError,
        savedCartLoading
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new SavedCartRepository(userToken); }, [userToken]);

  const unfetchSavedCart = useCallback(
    function() { savedCartDispatch({ type: SAVED_CART.UNFETCHED }); },
    [savedCartDispatch]
  );
  
  const fetchSavedCart = useCallback(
    async function(ID) {

      if (!window.navigator.onLine) {
        savedCartDispatch({
          type: SAVED_CART.ERROR_CHANGED,
          payload: { 
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION 
          }
        });
        return;
      }

      savedCartDispatch({ type: SAVED_CART.FETCHING });

      try {

        const res = await api.get(ID);
          
        if (res.status === 200) {
          savedCartDispatch({
            type: SAVED_CART.FETCHED, 
            payload: {
              savedCart: res.body.data, 
              id: String(res.body.data.id)
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
        savedCartDispatch({
          type: SAVED_CART.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, savedCartDispatch]
  );
  
  return [
    fetchSavedCart,
    savedCart,
    savedCartLoading,
    savedCartError,
    savedCartID,
    unfetchSavedCart
  ];
}
