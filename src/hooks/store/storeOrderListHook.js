
import { useCallback, useEffect } from "react";
import { getOrdersListFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus, useURLQuery } from "../viewHook";


export function useStoreOrderList(userToken) {

  const statusParam = useURLQuery().get('status');

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
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
      storeDispatch({ type: ORDER.LIST_STATUS_FILTER_CHANGED, payload: { status: statusParam } });
    },
    [statusParam, storeDispatch]
  );

  const refetch = useCallback(
    ()=> {
      if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
        storeDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [storeDispatch, ordersFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      storeDispatch({ type: ORDER.LIST_UNFETCHED });
    },
    [storeDispatch]
  );
  
  useEffect(
    ()=> {
      if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING) {
        
        storeDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new StoreRepository(userToken);
        api.getOrdersList(store.id, ordersPage, statusParam)
        .then(res=> {
          
          if (res.status === 200) {
            
            storeDispatch({
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

          } else if (res.status === 404) {

            storeDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            storeDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [store.id, statusParam, orders, ordersPage, ordersLoading, ordersFetchStatus, userToken, storeDispatch, listStatusUpdater]
  );

  return [orders, ordersFetchStatus, ordersPage, ordersNumberOfPages, refetch, refresh, onStatusChange];
}

