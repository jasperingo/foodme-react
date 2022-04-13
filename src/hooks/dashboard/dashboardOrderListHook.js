import { useCallback, useMemo } from "react";
import { ORDER } from "../../context/actions/orderActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";

export function useDashboardOrderList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    dashboard: {
      dashboardDispatch,
      dashboard: {
        orders,
        ordersError,
        ordersLoaded,
        ordersLoading,
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new OrderRepository(adminToken); }, [adminToken]);

  function refreshOrders() {
    dashboardDispatch({ type: ORDER.LIST_UNFETCHED });
  }

  const fetchOrders = useCallback(
    async function() {

      if (ordersLoading) return;

      if (!window.navigator.onLine) {
        dashboardDispatch({
          type: ORDER.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      dashboardDispatch({ type: ORDER.LIST_FETCHING });

      try {

        const res = await api.getList(1);
          
        if (res.status === 200) {

          dashboardDispatch({
            type: ORDER.LIST_FETCHED, 
            payload: { list: res.body.data }
          });

        } else {
          throw new Error();
        }

      } catch(error) {
        dashboardDispatch({
          type: ORDER.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      ordersLoading, 
      dashboardDispatch, 
    ]
  );

  return [
    fetchOrders,
    orders, 
    ordersLoading,
    ordersLoaded,
    ordersError,
    refreshOrders
  ];
}
