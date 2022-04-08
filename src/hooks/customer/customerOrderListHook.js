import { useCallback, useMemo } from "react";
import { ORDER } from "../../context/actions/orderActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CustomerRepository from "../../repositories/CustomerRepository";
import { useAppContext } from "../contextHook";

export function useCustomerOrderList(userId, userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        orders: {
          orders,
          ordersPage,
          ordersError,
          ordersLoaded,
          ordersLoading,
          ordersNumberOfPages
        } 
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new CustomerRepository(userToken); }, [userToken]);

  function setCustomerOrdersError(error) {
    dispatch({ 
      type: ORDER.LIST_ERROR_CHANGED, 
      payload: { error } 
    });
  }

  function refreshCustomerOrders() {
    dispatch({ type: ORDER.LIST_UNFETCHED });
  }

  const fetchCustomerOrders = useCallback(
    async function() {

      dispatch({ type: ORDER.LIST_FETCHING });

      try {
        
        const res = await api.getOrdersList(userId, ordersPage);

        if (res.status === 200) {
          dispatch({
            type: ORDER.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
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
          type: ORDER.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [userId, ordersPage, api, dispatch]
  );

  return [
    fetchCustomerOrders, 
    orders, 
    ordersLoading, 
    ordersLoaded, 
    ordersError,
    ordersPage, 
    ordersNumberOfPages, 
    setCustomerOrdersError, 
    refreshCustomerOrders
  ];
}
