
import { useCallback, useEffect } from "react";
import { getOrdersListFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus, useURLQuery } from "../viewHook";


export function useDeliveryFirmOrderList(userToken) {

  const statusParam = useURLQuery().get('status');

  const { 
    deliveryFirm: { 
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
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
      deliveryFirmDispatch({ type: ORDER.LIST_STATUS_FILTER_CHANGED, payload: { status: statusParam } });
    },
    [statusParam, deliveryFirmDispatch]
  );

  const refetch = useCallback(
    ()=> {
      if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
        deliveryFirmDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [deliveryFirmDispatch, ordersFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      deliveryFirmDispatch({ type: ORDER.LIST_UNFETCHED });
    },
    [deliveryFirmDispatch]
  );
  
  useEffect(
    ()=> {
      if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryFirmDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING) {
        
        deliveryFirmDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new DeliveryFirmRepository(userToken);
        api.getOrdersList(deliveryFirm.id, ordersPage, statusParam)
        .then(res=> {
          
          if (res.status === 200) {
            
            deliveryFirmDispatch({
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

            deliveryFirmDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            deliveryFirmDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryFirmDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      deliveryFirm.id, 
      statusParam,
      orders, 
      ordersPage, 
      ordersLoading, 
      ordersFetchStatus, 
      userToken, 
      deliveryFirmDispatch, 
      listStatusUpdater
    ]
  );

  return [orders, ordersFetchStatus, ordersPage, ordersNumberOfPages, refetch, refresh, onStatusChange];
}

