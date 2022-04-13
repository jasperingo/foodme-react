
import { useCallback, useMemo } from "react";
import { CUSTOMER } from "../../context/actions/customerActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CustomerRepository from "../../repositories/CustomerRepository";
import { useAppContext } from "../contextHook";

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
        customersError,
        customersLoaded,
        customersLoading,
      } 
    } 
  } = useAppContext();

  const api = useMemo(function() { return new CustomerRepository(adminToken); }, [adminToken]);

  function refreshCustomers() {
    dashboardDispatch({ type: CUSTOMER.LIST_UNFETCHED }); 
  }

  const fetchCustomers = useCallback(
    async function() {

      if (customersLoading) return;

      if (!window.navigator.onLine) {
        dashboardDispatch({
          type: CUSTOMER.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      dashboardDispatch({ type: CUSTOMER.LIST_FETCHING });
      
      try {
        const res = await api.getList(1);
          
        if (res.status === 200) {
          
          dashboardDispatch({
            type: CUSTOMER.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
      } catch(error) {
        dashboardDispatch({
          type: CUSTOMER.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api, 
      customersLoading,
      dashboardDispatch, 
    ]
  );

  return [
    fetchCustomers,
    customers, 
    customersLoading,
    customersLoaded,
    customersError,
    refreshCustomers
  ];
}
