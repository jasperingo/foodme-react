import { useCallback, useMemo } from "react";
import { ORDER } from "../../context/actions/orderActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";

export function useOrderList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    order: { 
      orderDispatch,
      order: {
        orders,
        ordersPage,
        ordersError,
        ordersLoaded,
        ordersLoading,
        ordersNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new OrderRepository(adminToken); }, [adminToken]);

  function refreshOrders() {
    orderDispatch({ type: ORDER.LIST_UNFETCHED });
  }

  const fetchOrders = useCallback(
    async function(status) {

      if (ordersLoading) return;

      if (!window.navigator.onLine) {
        orderDispatch({
          type: ORDER.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      orderDispatch({ type: ORDER.LIST_FETCHING });

      try {

        const res = await api.getList(ordersPage, status);
          
        if (res.status === 200) {

          orderDispatch({
            type: ORDER.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
          });

        } else {
          throw new Error();
        }

      } catch(error) {
        orderDispatch({
          type: ORDER.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      ordersPage, 
      ordersLoading, 
      orderDispatch, 
    ]
  );

  return [
    fetchOrders,
    orders, 
    ordersLoading,
    ordersLoaded,
    ordersError,
    ordersPage, 
    ordersNumberOfPages,
    refreshOrders
  ];
}
