
import { useCallback, useMemo } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CustomerRepository from "../../repositories/CustomerRepository";
import { useAppContext } from "../contextHook";

export function useCustomerFavoriteList(userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        products: {
          products,
          productsPage,
          productsError,
          productsLoaded,
          productsLoading,
          productsNumberOfPages
        } 
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new CustomerRepository(userToken); }, [userToken]);

  function refreshCustomerProducts() {
    dispatch({ type: PRODUCT.LIST_UNFETCHED });
  }

  const fetchCustomerProducts = useCallback(
    async function(ID) {

      if (productsLoading) return;

      if (!window.navigator.onLine) {
        dispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      dispatch({ type: PRODUCT.LIST_FETCHING });

      try {
        
        const res = await api.getFavoritesList(ID, productsPage);

        if (res.status === 200) {
          dispatch({
            type: PRODUCT.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
          });
        } else if (res.status === 401) {
          throw new NetworkError(NetworkErrorCodes.UNAUTHORIZED);
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
        
      } catch(error) {
        dispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [productsPage, productsLoading, api, dispatch]
  );
  
  return [
    fetchCustomerProducts, 
    products, 
    productsLoading, 
    productsLoaded, 
    productsError,
    productsPage, 
    productsNumberOfPages, 
    refreshCustomerProducts
  ];
}

