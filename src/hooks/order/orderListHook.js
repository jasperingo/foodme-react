import { useCallback, useEffect } from "react";
import { getOrdersListFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useOrderList(userId, userToken) {

  const { 
    order: { 
      orderDispatch,
      order: {
        orders,
        ordersPage,
        ordersNumberOfPages,
        ordersFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
      orderDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
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
      if (ordersFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        orderDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (ordersFetchStatus === FETCH_STATUSES.LOADING) {

        const api = new CustomerRepository(userToken);
        api.getOrdersList(userId, ordersPage)
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
          orderDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [userId, userToken, orders.length, ordersPage, ordersFetchStatus, orderDispatch, listStatusUpdater]
  );


  return [orders, ordersFetchStatus, ordersPage, ordersNumberOfPages, refetch, refresh];
}
