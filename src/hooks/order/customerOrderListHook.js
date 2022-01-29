import { useCallback, useEffect } from "react";
import { getOrdersListFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useCustomerOrderList() {

  const { 
    order: { 
      orderDispatch,
      order: {
        orders,
        ordersPage,
        ordersNumberOfPages,
        ordersFetchStatus
      } 
    },
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
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
        const api = new CustomerRepository(customerToken);
        api.getOrdersList(customer.id, ordersPage)
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
    [customer.id, customerToken, orders.length, ordersPage, ordersFetchStatus, orderDispatch, listStatusUpdater]
  );


  return [orders, ordersFetchStatus, ordersPage, ordersNumberOfPages, refetch, refresh];
}
