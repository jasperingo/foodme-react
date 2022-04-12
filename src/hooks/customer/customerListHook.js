
import { useCallback, useMemo } from "react";
import { CUSTOMER } from "../../context/actions/customerActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CustomerRepository from "../../repositories/CustomerRepository";
import { useAppContext } from "../contextHook";

export function useCustomerList(userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        customers: {
          customers,
          customersPage,
          customersError,
          customersLoaded,
          customersLoading,
          customersNumberOfPages
        }
      } 
    } 
  } = useAppContext();

  const api = useMemo(function() { return new CustomerRepository(userToken); }, [userToken]);

  function refreshCustomers() {
    dispatch({ type: CUSTOMER.LIST_UNFETCHED }); 
  }

  const fetchCustomers = useCallback(
    async function() {

      if (customersLoading) return;

      if (!window.navigator.onLine) {
        dispatch({
          type: CUSTOMER.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      dispatch({ type: CUSTOMER.LIST_FETCHING });
      
      try {
        const res = await api.getList(customersPage);
          
        if (res.status === 200) {
          
          dispatch({
            type: CUSTOMER.LIST_FETCHED, 
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
        dispatch({
          type: CUSTOMER.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      customersPage, 
      customersLoading,
      dispatch, 
    ]
  );

  return [
    fetchCustomers,
    customers, 
    customersLoading,
    customersLoaded,
    customersError,
    customersPage, 
    customersNumberOfPages,
    refreshCustomers
  ];
}
