
import { useCallback, useEffect } from "react";
import { CUSTOMER, getCustomersListFetchStatusAction } from "../../context/actions/customerActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useDashboardCustomerList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    dashboard: {
      dashboardDispatch,
      dashboard: {
        customers,
        customersLoading,
        customersFetchStatus
      }
    } 
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (customersFetchStatus !== FETCH_STATUSES.LOADING) 
        dashboardDispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [dashboardDispatch, customersFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (customersLoading && customersFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dashboardDispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (customersLoading && customersFetchStatus === FETCH_STATUSES.LOADING) {

        dashboardDispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new CustomerRepository(adminToken);
        api.getList(1)
        .then(res=> {
          
          if (res.status === 200) {
            
            dashboardDispatch({
              type: CUSTOMER.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                fetchStatus: listStatusUpdater(1, 1, 0, res.body.data.length),
              }
            });

          } else if (res.status === 404) {

            dashboardDispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            dashboardDispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          dashboardDispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      customers, 
      customersLoading,
      customersFetchStatus, 
      adminToken, 
      dashboardDispatch, 
      listStatusUpdater
    ]
  );

  return [customers, customersFetchStatus, refetch];
}

