import { useCallback, useMemo } from "react";
import { CUSTOMER } from "../../context/actions/customerActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CustomerRepository from "../../repositories/CustomerRepository";
import { useAppContext } from "../contextHook";

export function useCustomerFetch(userToken) {

  const { 
    customer: { 
      dispatch,
      customer: {
        customer: {
          customer,
          customerID,
          customerLoading,
          customerError
        }
      }
    } 
  } = useAppContext();

  const api = useMemo(function() { return new CustomerRepository(userToken); }, [userToken]);

  const unfetchCustomer = useCallback(
    function() { dispatch({ type: CUSTOMER.UNFETCHED }); },
    [dispatch]
  );
  
  const fetchCustomer = useCallback(
    async function(ID) {

      if (customerLoading) return;
        
      if (!window.navigator.onLine) {
        dispatch({
          type: CUSTOMER.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      dispatch({ type: CUSTOMER.FETCHING });
    
      try {

        const res = await api.get(ID);
          
        if (res.status === 200) {
          
          dispatch({
            type: CUSTOMER.FETCHED, 
            payload: { 
              id: ID,
              customer: res.body.data
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
          type: CUSTOMER.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
        
      }
    },
    [api, customerLoading, dispatch]
  );
  
  return [
    fetchCustomer,
    customer,
    customerLoading,
    customerError,
    customerID,
    unfetchCustomer
  ];
}
