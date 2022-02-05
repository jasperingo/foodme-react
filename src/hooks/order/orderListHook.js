import { useCallback, useEffect } from "react";
import { getOrdersListFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus, useURLQuery } from "../viewHook";


export function useOrderList() {

  const statusParam = useURLQuery().get('status');

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
        ordersLoading,
        ordersNumberOfPages,
        ordersFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const onStatusChange = useCallback(
    ()=> {
      orderDispatch({ type: ORDER.LIST_STATUS_FILTER_CHANGED, payload: { status: statusParam } });
    },
    [statusParam, orderDispatch]
  );

  const refetch = useCallback(
    ()=> {
      if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
        orderDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [orderDispatch, ordersFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      orderDispatch({ type: ORDER.LIST_UNFETCHED });
    },
    [orderDispatch]
  );

  useEffect(
    ()=> {

      if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        orderDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING) {
        
        orderDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new OrderRepository(adminToken);
        api.getList(ordersPage, statusParam)
        .then(res=> {
          
          if (res.status === 200) {

            orderDispatch({
              type: ORDER.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  ordersPage, 
                  res.body.pagination.number_of_pages, 
                  orders.length, 
                  res.body.data.length
                ),
              }
            });

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          orderDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      adminToken, 
      statusParam,
      orders.length, 
      ordersPage, 
      ordersLoading, 
      ordersFetchStatus, 
      orderDispatch, 
      listStatusUpdater
    ]
  );


  return [orders, ordersFetchStatus, ordersPage, ordersNumberOfPages, refetch, refresh, onStatusChange];
}
