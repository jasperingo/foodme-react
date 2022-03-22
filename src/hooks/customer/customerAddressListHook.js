import { useCallback, useMemo } from "react";
import { ADDRESS } from "../../context/actions/addressActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CustomerRepository from "../../repositories/CustomerRepository";
import { useAppContext } from "../contextHook";


export function useCustomerAddressList(userId, userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        addresses: {
          addresses,
          addressesLoading,
          addressesError,
          addressesLoaded,
        }
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new CustomerRepository(userToken); }, [userToken]);

  const refresh = useCallback(
    function() {
      dispatch({ type: ADDRESS.LIST_UNFETCHED });
    },
    [dispatch]
  );

  const retryFetch = useCallback(
    function() { 
      dispatch({ 
        type: ADDRESS.LIST_ERROR_CHANGED, 
        payload: { error: null } 
      });
    },
    [dispatch]
  );

  const fetch = useCallback(
    async function() {
      if (addressesLoading || addressesError !== null) return;

      if (!window.navigator.onLine) {
        dispatch({
          type: ADDRESS.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      dispatch({ type: ADDRESS.LIST_FETCHING });

      try {
        
        const res = await api.getAddressesList(userId);

        if (res.status === 200) {
          dispatch({
            type: ADDRESS.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else if (res.status === 401) {
          throw new NetworkError(NetworkErrorCodes.UNAUTHORIZED);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
        
      } catch(error) {
        dispatch({
          type: ADDRESS.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }

    },
    [userId, api, addressesLoading, addressesError, dispatch]
  );

  return [
    fetch, 
    addresses, 
    addressesLoading, 
    addressesError, 
    addressesLoaded, 
    retryFetch,
    refresh
  ];
}

