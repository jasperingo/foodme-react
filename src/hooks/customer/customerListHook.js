
import { useCallback, useEffect } from "react";
import { CUSTOMER, getCustomersListFetchStatusAction } from "../../context/actions/customerActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useCustomerList(userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        customers: {
          customers,
          customersPage,
          customersLoading,
          customersNumberOfPages,
          customersFetchStatus
        }
      } 
    } 
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (customersFetchStatus !== FETCH_STATUSES.LOADING) 
        dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [dispatch, customersFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      dispatch({ type: CUSTOMER.LIST_UNFETCHED });
    },
    [dispatch]
  );
  
  useEffect(
    ()=> {
      if (customersLoading && customersFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (customersLoading && customersFetchStatus === FETCH_STATUSES.LOADING) {

        dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new CustomerRepository(userToken);
        api.getList(customersPage)
        .then(res=> {
          
          if (res.status === 200) {
            
            dispatch({
              type: CUSTOMER.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  customersPage, 
                  res.body.pagination.number_of_pages, 
                  customers.length, 
                  res.body.data.length
                ),
              }
            });

          } else if (res.status === 404) {

            dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      customers, 
      customersPage, 
      customersLoading,
      customersFetchStatus, 
      userToken, 
      dispatch, 
      listStatusUpdater
    ]
  );

  return [customers, customersFetchStatus, customersPage, customersNumberOfPages, refetch, refresh];
}

