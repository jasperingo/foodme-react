import { useCallback, useEffect } from "react";
import { getOrdersListFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useCustomerOrderList(userId, userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        orders: {
          orders,
          ordersPage,
          ordersLoading,
          ordersNumberOfPages,
          ordersFetchStatus
        } 
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
        dispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [dispatch, ordersFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      dispatch({ type: ORDER.LIST_UNFETCHED });
    },
    [dispatch]
  );

  useEffect(
    ()=> {
      if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (ordersLoading && ordersFetchStatus === FETCH_STATUSES.LOADING) {
        
        dispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new CustomerRepository(userToken);
        api.getOrdersList(userId, ordersPage)
        .then(res=> {
          
          if (res.status === 200) {
            dispatch({
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
          dispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [userId, userToken, orders.length, ordersPage, ordersLoading, ordersFetchStatus, dispatch, listStatusUpdater]
  );


  return [orders, ordersFetchStatus, ordersPage, ordersNumberOfPages, refetch, refresh];
}
