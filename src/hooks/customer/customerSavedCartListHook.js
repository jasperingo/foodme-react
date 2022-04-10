
import { useCallback, useMemo } from "react";
import { SAVED_CART } from "../../context/actions/savedCartActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CustomerRepository from "../../repositories/CustomerRepository";
import { useAppContext } from "../contextHook";

export function useCustomerSavedCartList(userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        savedCarts: {
          savedCarts,
          savedCartsPage,
          savedCartsError,
          savedCartsLoaded,
          savedCartsLoading,
          savedCartsNumberOfPages
        } 
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new CustomerRepository(userToken); }, [userToken]);

  function refreshCustomerSavedCarts() {
    dispatch({ type: SAVED_CART.LIST_UNFETCHED });
  }

  const fetchCustomerSavedCarts = useCallback(
    async function(ID) {

      if (savedCartsLoading) return;

      if (!window.navigator.onLine) {
        dispatch({
          type: SAVED_CART.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      dispatch({ type: SAVED_CART.LIST_FETCHING });

      try {
        
        const res = await api.getSavedCartsList(ID, savedCartsPage);

        if (res.status === 200) {
          dispatch({
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
        dispatch({
          type: SAVED_CART.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [savedCartsPage, savedCartsLoading, api, dispatch]
  );

  return [
    fetchCustomerSavedCarts, 
    savedCarts, 
    savedCartsLoading, 
    savedCartsLoaded, 
    savedCartsError,
    savedCartsPage, 
    savedCartsNumberOfPages, 
    refreshCustomerSavedCarts
  ];
}
