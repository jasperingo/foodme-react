import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";


export function useOrderFetch() {

  const { ID } = useParams();

  const { 
    order: { 
      orderDispatch,
      order: {
        order,
        orderFetchStatus
      } 
    },
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (orderFetchStatus !== FETCH_STATUSES.LOADING && orderFetchStatus !== FETCH_STATUSES.DONE)
        orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [orderFetchStatus, orderDispatch]
  );
  
  useEffect(
    ()=> {

      if (orderFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (orderFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new OrderRepository(customerToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            orderDispatch({
              type: ORDER.FETCHED, 
              payload: {
                order: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {
            orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.NOT_FOUND));
          } else if (res.status === 403) {
            orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.FORBIDDEN));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    }
  );

  useEffect(
    ()=> {
      if (order !== null && order.id === Number(ID)) return;
        orderDispatch({ type: ORDER.UNFETCHED });
    },
    [ID, order, orderDispatch]
  );

  return [order, orderFetchStatus, refetch];
}

