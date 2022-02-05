import { useCallback, useEffect } from "react";
import { getOrdersListFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


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
        ordersLoading,
        ordersFetchStatus
      }
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
        dashboardDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [dashboardDispatch, ordersFetchStatus]
  );

  useEffect(
    ()=> {
      if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dashboardDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING) {
        
        dashboardDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new OrderRepository(adminToken);
        api.getList(1)
        .then(res=> {
          
          if (res.status === 200) {

            dashboardDispatch({
              type: ORDER.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                fetchStatus: listStatusUpdater(1, 1, 0, res.body.data.length),
              }
            });

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          dashboardDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [adminToken, ordersLoading, ordersFetchStatus, dashboardDispatch, listStatusUpdater]
  );


  return [orders, ordersFetchStatus, refetch];
}
