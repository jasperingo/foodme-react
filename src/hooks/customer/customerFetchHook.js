import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CUSTOMER, getCustomerFetchStatusAction } from "../../context/actions/customerActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useCustomerFetch(userToken) {

  const { ID } = useParams();

  const { 
    customer: { 
      dispatch,
      customer: {
        customer: {
          customer,
          customerID,
          customerLoading,
          customerFetchStatus
        }
      }
    } 
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (customerFetchStatus !== FETCH_STATUSES.LOADING && customerFetchStatus !== FETCH_STATUSES.DONE)
        dispatch(getCustomerFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, customerFetchStatus, dispatch]
  );
  
  useEffect(
    ()=> {

      if (customerID !== null && customerID !== Number(ID)) {
        
        dispatch({ type: CUSTOMER.UNFETCHED });

      } else if (customerLoading && customerFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dispatch(getCustomerFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (customerLoading && customerFetchStatus === FETCH_STATUSES.LOADING) {

        dispatch(getCustomerFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));
        
        const api = new CustomerRepository(userToken);

        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            
            dispatch({
              type: CUSTOMER.FETCHED, 
              payload: { 
                customer: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
            
          } else if (res.status === 404) {

            dispatch(getCustomerFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));

          } else if (res.status === 403) {

            dispatch(getCustomerFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          dispatch(getCustomerFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );
  
  return [customer, customerFetchStatus, refetch];
}
